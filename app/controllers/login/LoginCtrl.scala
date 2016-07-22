package controllers.login

import com.google.inject.{Inject, Singleton}
import controllers.Errors
import controllers.actions.Actions
import models.authentication.{AuthenticationService, Credentials}
import models.user.User
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.{Action, BodyParsers, Controller}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class LoginCtrl @Inject()(actions: Actions, authenticationService: AuthenticationService)(val  messagesApi: MessagesApi) extends Controller with I18nSupport{

  import actions._
  import models.authentication.Formats._

  def index = Action(Ok(views.html.login()))

  def login = Action.async(BodyParsers.parse.json) {implicit request =>

    val onUnauthorized = (error: String) =>  BadRequest(Errors.toJson(error))
    val onSuccess = (user: User)         => Ok(Json.obj("url" -> controllers.routes.ApplicationCtrl.index().url))

    request.body.validate[Credentials].fold(
      e => Future(BadRequest(Errors.toJson(e))),
      v => authenticationService.authenticate(v,onSuccess, onUnauthorized)
    )

  }

  def logout = IsAuthenticated{implicit request =>

    authenticationService.logout(
      Redirect(controllers.login.routes.LoginCtrl.index())
    )

  }

}
