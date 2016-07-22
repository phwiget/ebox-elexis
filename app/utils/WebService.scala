package utils

import com.google.inject.Inject
import play.api.http.Status
import play.api.libs.json.{JsValue, Json}
import play.api.libs.ws.WSClient
import play.api.http.HttpVerbs._
import scala.concurrent.Future
import scala.xml.NodeSeq

import scala.concurrent.ExecutionContext.Implicits.global

class WebService @Inject()(wSClient: WSClient) {

  def request[T](url: String, method: String, data: Option[JsValue] = None)(implicit converter: NodeSeq => T): Future[Either[String,T]] = {

    val wsRequest = wSClient.url(url)

    val response = method match{
      case GET  => wsRequest.get()
      case POST => wsRequest.post(data.getOrElse(Json.obj()))
      case _    => wsRequest.get()
    }

    response.map(r =>
      r.status match{
        case Status.OK => Right(r.xml: T)
        case _ => Left("error.server.status." + r.status.toString)

    }) recover {case t: Throwable => Left("error.server.unavailable")}

  }


}
