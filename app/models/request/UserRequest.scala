package models.request

import models.user.User
import play.api.mvc.{Request, WrappedRequest}

/**
  * Abstract class for more generic usage
  *
  * @param request Incoming request
  * @tparam A Content-Type of request
  */
abstract class UserRequest[A](val request: Request[A]) extends WrappedRequest[A](request: Request[A]){
  val user:User
}
