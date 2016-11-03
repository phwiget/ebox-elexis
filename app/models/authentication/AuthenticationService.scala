package models.authentication

import java.util.concurrent.TimeUnit

import com.google.inject.Inject
import models.Endpoints
import models.request.UserRequest
import models.user.{ElexisUser, User}
import play.api.cache.CacheApi
import play.api.libs.json.{JsValue, Json}
import play.api.libs.ws.WSClient
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.concurrent.duration.Duration
import models.authentication.Formats._
import play.api.{Environment, Configuration}

class AuthenticationService @Inject()(wSClient: WSClient, endpoints: Endpoints, cache: CacheApi)(conf: Configuration) {

  val CacheKey = "users_"

  /**
    * Authenticate users logging in from the Web-App
    * @param credentials Username & Password
    * @param onSuccess Action to be called in case of successful authentication
    * @param onUnauthorized Action to be called in case of failed authentication
    * @return
    */
  def authenticate(credentials: Credentials, onSuccess: User => Result, onUnauthorized: String => Result): Future[Result] = {

    val url = endpoints.Authentication.login
    val loginData: JsValue = Json.obj("user" -> credentials.username, "password" -> credentials.password)

    if (conf.getBoolean("application.skipAuthentication").getOrElse(false)) {

      val u = Json.obj("id" -> "abc","name" -> "tester", "roles" -> Json.arr("a","b","c"), "permissions" -> Json.arr("z"), "token" -> "SECRET_TOKEN")
      Future.successful(redirect(cache(toUser(u)), onSuccess))

    } else {

      wSClient.url(url).post(loginData).map { res =>

        res.status match {
          case 200 => redirect(cache(toUser(res.json)), onSuccess)
          case 400 => onUnauthorized("error.user.unauthorized")
          case _ => onUnauthorized("error.server.unavailable")
        }

      } recover {case t:Throwable => onUnauthorized("error.server.unavailable")}

    }

  }

  private def cache(user: User): User = cache.getOrElse(CacheKey + user.name,Duration(24*3600, TimeUnit.SECONDS)){user}

  private def redirect(user: User, onSuccess: User => Result): Result = onSuccess(user).withSession("username" -> user.name)

  private def toUser(data: JsValue): User = data.validate[ElexisUser].get

  /**
    * Find a user in the cache<br>
    * This function is used to check permissions on a per-request basis
    * @param username Username
    * @return
    */
  //TODO: Get user from API if not found in cache
  def find(username: String): Option[User] = cache.getOrElse[Option[User]](CacheKey + username)(Some(ElexisUser("id",Seq.empty, Seq.empty, "Elexis", "token")))


  /**
    * Logout a user by destroying its session
    *
    * @param onLogout Action to be performed after logout (message, redirect etc.)
    * @param userRequest UserRequest, required to clean the cache
    * @return
    */
  def logout(onLogout: => Result)(implicit userRequest: UserRequest[AnyContent]):Result = {
    cache.remove(CacheKey + userRequest.user.name)
    onLogout.withNewSession
  }

}
