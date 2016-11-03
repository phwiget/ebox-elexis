package models.authentication


import helpers.{FakeCache, SingleInstance}
import models.Endpoints
import models.user.{ElexisUser, User}
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.libs.ws.WSClient
import play.api.mvc.{Action, Call, Results}
import play.api.test.PlaySpecification
import mockws.MockWS
import play.api.{Configuration, Environment, Mode}


class AuthenticationServiceSpec extends PlaySpecification with Mockito with SingleInstance{

  val wsClient = mock[WSClient]
  val endpoints = mock[Endpoints]
  endpoints.Authentication returns mock[AuthenticationServiceSpec.this.endpoints.Authentication.type]
  val cache = mock[FakeCache]
  val conf = mock[Configuration]

  val ws = MockWS {
    case (POST, "/login") => Action { Results.Ok(Json.obj("id" -> "abc","name" -> "tester","token"->"TOKEN", "roles" -> Json.arr("a","b","c"), "permissions" -> Json.arr()))}
    case (POST, "/fail") => Action { Results.BadRequest }
    case (POST, "/fail2") => Action { Results.BadGateway }
  }

  val service = new AuthenticationService(ws,endpoints,cache)(conf)

  "Authentication Service" should {

    "find a user in the cache" in {

      val user = mock[User]
      user.name returns "test"

      cache.getOrElse[Option[User]](service.CacheKey + "test")(Some(ElexisUser("id",Seq.empty, Seq.empty, "Elexis", "token"))) returns Some(user)
      service.find("test") must equalTo(Some(user))

//      cache.get[User](service.CacheKey + "test") returns None
//      service.find("test") must equalTo(None)

    }

    "authenticate a user" in {

      val credentials = Credentials("a","b")
      val onUnauthorized = (s: String) => Results.BadRequest(s)
      val onSuccess = (user: User) => Results.BadRequest("test")

      val service = new AuthenticationService(ws,endpoints,new FakeCache)(conf)

      conf.getBoolean("application.skipAuthentication") returns Some(false)

      endpoints.Authentication.login returns "/login"

      val r1 = service.authenticate(credentials,onSuccess, onUnauthorized)
      status(r1) must equalTo(400)
      contentAsString(r1) must equalTo("test")


      endpoints.Authentication.login returns "/fail"

      val r2 = service.authenticate(credentials,onSuccess, onUnauthorized)
      status(r2) must equalTo(400)
      contentAsString(r2) must equalTo("error.user.unauthorized")

      endpoints.Authentication.login returns "/fail2"

      val r3 = service.authenticate(credentials,onSuccess, onUnauthorized)
      status(r3) must equalTo(400)
      contentAsString(r3) must equalTo("error.server.unavailable")

    }

  }

}
