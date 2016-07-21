package models.request

import models.authentication.AuthenticationService
import models.user.User
import play.api.mvc.{ActionTransformer, _}

import scala.concurrent.Future

/**
  * Extension of request
  * Usage: val name = request.user.name
  *
  * @param user Abstract User
  * @param request Incoming request
  * @tparam A Content type of request
  */
class RequestWithUser[A](val user: User, request: Request[A]) extends UserRequest[A](request)

/**
  * Filter for authenticated users
  * @param onUnauthorized Result to be returned if not authorized
  */
class CheckUserExists(onUnauthorized: RequestHeader => Result)(authenticationService: AuthenticationService) extends ActionBuilder[Request] with ActionFilter[Request] {
  def filter[A](request: Request[A]) = Future.successful {

    if (request.session.get("username").flatMap(u => authenticationService.find(u)).isDefined) None else Some(onUnauthorized(request))

  }
}

/**
  * Extend the request with a user object upon session authentication
  */
class GetUserBySession(authenticationService: AuthenticationService) extends ActionBuilder[UserRequest] with ActionTransformer[Request, UserRequest] {

  def transform[A](request: Request[A]) = Future.successful(
    request.session.get("username").flatMap(u => authenticationService.find(u)).map(u => new RequestWithUser(u, request)).get
  )

}

/**
  * Check for permissions
  * @param onForbidden Result on access denied
  * @param permissions Permissions needed to access
  */
class CheckPermission(onForbidden: User => Result)(permissions:Seq[String]) extends ActionFilter[UserRequest] {
  def filter[A](request: UserRequest[A]) = Future.successful {
    if (request.user.permissions.intersect(permissions).nonEmpty) None else Some(onForbidden(request.user))
  }
}

/**
  * Check for roles
  * @param onForbidden Result on access denied
  * @param roles Permissions needed to access
  */
class CheckRoles(onForbidden: User => Result)(roles:Seq[String]) extends ActionFilter[UserRequest] {
  def filter[A](request: UserRequest[A]) = Future.successful {
    if (request.user.roles.intersect(roles).nonEmpty) None else Some(onForbidden(request.user))
  }
}