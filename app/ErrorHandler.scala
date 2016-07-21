import play.api.http.{HttpErrorHandler, MimeTypes}
import play.api.mvc._
import play.api.mvc.Results._

import scala.concurrent._
import javax.inject.Singleton

import play.api.libs.json.Json

@Singleton
class ErrorHandler extends HttpErrorHandler {

  def onClientError(request: RequestHeader, statusCode: Int, message: String) = {
    Future.successful(

      (request.contentType, statusCode) match{

        case (Some(MimeTypes.JSON),_)             => Status(statusCode)(Json.obj("status" -> "A client error occurred."))
        case (Some(MimeTypes.XML),_)              => Status(statusCode)(<error>A client error occurred.</error>)
        case (_, play.api.http.Status.NOT_FOUND)  => Status(statusCode)(views.html.error("Page not found")(request))
        case (_, _)                               => Status(statusCode)(views.html.error("A client error occurred")(request))

      }

    )
  }

  def onServerError(request: RequestHeader, exception: Throwable) = {

    Future.successful(
      request.contentType match{
        case (Some(MimeTypes.JSON)) => InternalServerError(Json.obj("status" -> "A server error occured."))
        case (Some(MimeTypes.XML)) => InternalServerError(<error>A server error occured</error>)
        case _ => InternalServerError(views.html.error("A server error occured")(request))
      }
    )
  }
}