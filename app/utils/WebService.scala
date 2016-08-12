package utils

import com.google.inject.Inject
import models.request.UserRequest
import play.api.http.Status
import play.api.libs.json.{JsValue, Json}
import play.api.libs.ws.{WSClient, WSRequest}
import play.api.http.HttpVerbs._
import play.api.mvc.AnyContent

import scala.concurrent.Future
import scala.xml.NodeSeq
import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Wrapper to handle http-request to the FHIR REST-API<br>
  * The exchange format is assumed to be XML
  * @param wSClient The ws-Client
  */
class WebService @Inject()(wSClient: WSClient) {

  /**
    * Send request with an authentication token taken from the user-session
    * @param url endpoint
    * @param method HTTP-method
    * @param data body
    * @param converter implicit converter from XML to type T
    * @param request Userrequest containing the token
    * @tparam T type T
    * @return Either an error or the requested type T
    */
  def request[T](url: String, method: String, data: Option[JsValue] = None)(implicit converter: NodeSeq => T, request: UserRequest[AnyContent]): Future[Either[String,T]] = {

    val wsRequest = wSClient.url(url).withHeaders("token" -> request.user.token)

    send(wsRequest,method,data)

  }

  def simpleRequest[T](url: String, method: String, data: Option[JsValue] = None)(implicit converter: NodeSeq => T): Future[Either[String,T]] = {

    val wsRequest = wSClient.url(url)

    send(wsRequest,method,data)

  }

  private def send[T](wsRequest: WSRequest, method: String, data: Option[JsValue] = None)(implicit converter: NodeSeq => T): Future[Either[String,T]] = {

    val response = method match{
      case GET  => wsRequest.get()
      case POST => wsRequest.post(data.getOrElse(Json.obj()))
      case PUT  => wsRequest.put(data.getOrElse(Json.obj()))
      case _    => wsRequest.get()
    }

    response.map(r =>
      r.status match{
        case Status.OK => Right(r.xml: T)
        case _ => Left("error.server.status." + r.status.toString)

      }) recover {case t: Throwable => Left("error.server.unavailable")}

  }
}
