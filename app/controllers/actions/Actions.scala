package controllers.actions

import com.google.inject.Inject
import controllers.routes
import models.authentication.AuthenticationService
import models.request.{CheckPermission, CheckRoles, CheckUserExists, GetUserBySession}
import models.user.User
import play.api.mvc.{RequestHeader, Results}

class Actions @Inject()(authenticationService: AuthenticationService) {

  private def onUnauthorized(r:RequestHeader) = Results.Redirect(controllers.login.routes.LoginCtrl.index()).withNewSession.flashing("redirect" -> "loggedout")
  private def onForbidden(user:User) = Results.Forbidden("nothing to see here")

  val UserExists = new CheckUserExists(onUnauthorized)(authenticationService)
  val IsAuthenticated = UserExists andThen new GetUserBySession(authenticationService)

  def WithPermissions(permissions: String*) = new CheckPermission(onForbidden)(permissions.toSeq)
  def WithRoles(roles: String*) = new CheckRoles(onForbidden)(roles.toSeq)


}
