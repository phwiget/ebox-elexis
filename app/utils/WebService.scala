package utils

import com.google.inject.Inject
import models.fhir.XmlRepresentation
import models.request.UserRequest
import play.api.Logger
import play.api.http.Status
import play.api.libs.ws.{WSClient, WSRequest}
import play.api.http.HttpVerbs._
import play.api.http.HeaderNames._
import play.api.mvc.AnyContent

import scala.concurrent.Future
import scala.xml.NodeSeq
import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Wrapper to handle http-request to the FHIR REST-API<br>
  * The exchange format is assumed to be XML
 *
  * @param wSClient The ws-Client
  */
class WebService @Inject()(wSClient: WSClient) {

  /**
    * Send request with an authentication token taken from the user-session
 *
    * @param url endpoint
    * @param method HTTP-method
    * @param data body
    * @param converter implicit converter from XML to type T
    * @param request Userrequest containing the token
    * @tparam T type T
    * @return Either an error or the requested type T
    */
  def request[T](url: String, method: String, data: Option[XmlRepresentation] = None)(implicit converter: NodeSeq => T, request: UserRequest[AnyContent]): Future[Either[String,T]] = {

    val wsRequest = wSClient.url(url).withHeaders("token" -> request.user.token).withHeaders(CONTENT_TYPE -> "application/xml")

    send(wsRequest,method,data)

  }

  def simpleRequest[T](url: String, method: String, data: Option[XmlRepresentation] = None)(implicit converter: NodeSeq => T): Future[Either[String,T]] = {

    val wsRequest = wSClient.url(url)

    send(wsRequest,method,data)

  }

  private def send[T](wsRequest: WSRequest, method: String, data: Option[XmlRepresentation] = None)(implicit converter: NodeSeq => T): Future[Either[String,T]] = {

    lazy val xml = data.map(_.toXML).getOrElse(NodeSeq.Empty)

    val response = method match{
      case GET  => wsRequest.get()
      case POST => wsRequest.post(xml)
      case PUT  => wsRequest.put(xml)
      case _    => wsRequest.get()
    }

    response.map(r =>
      r.status match{
        case Status.OK => Right(converter(r.xml))
        case Status.CREATED => Right(converter(<contentLocation url={r.header(CONTENT_LOCATION).orNull}/>))
        case _ =>
          Logger.error(s"Client error ${r.status}: ${r.body}")
          Left("error.server.status." + r.status.toString)
      }) recover {case t: Throwable =>
        Logger.error(s"Server unavailable on ${wsRequest.url}")
        Left("error.server.unavailable")
    }

  }
}
