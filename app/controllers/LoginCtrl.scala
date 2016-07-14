package controllers

import com.google.inject.Inject
import play.api.Configuration
import play.api.libs.json.Json
import play.api.libs.ws.WSClient
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext.Implicits.global

class LoginCtrl @Inject()(wSClient: WSClient, configuration: Configuration)extends Controller{

  def login = Action.async {

    val url = configuration.getString("url.login").get
    val loginData = Json.obj("user" -> "abc", "password" -> "abc")

    wSClient.url(url).post(loginData).map { response =>

      println(response)
      Ok

    }

  }

  def index = Action(Ok(views.html.login()))

}
