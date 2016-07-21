package models.request

import models.authentication.AuthenticationService
import models.user.User
import org.specs2.mock.Mockito
import play.api.mvc._
import play.api.test.PlaySpecification
import scala.concurrent.Await
import scala.concurrent.duration._


class ActionSpec extends PlaySpecification with Mockito {

  val timeout = 5000 millis
  val user = mock[User]
  user.name returns "test@test.com"

  val authService = mock[AuthenticationService]
  val request = mock[Request[AnyContent]]

  val session = mock[Session]
  val headers = mock[Headers]

  request.session returns session
  request.headers returns headers

  val userRequest = mock[UserRequest[AnyContent]]

  userRequest.user returns user

  "Action" should {

    "check if a user exists" in {

      session.get("username") returns Option("test@test.com")
      authService.find("test@test.com") returns Some(user)


      val onFailure = mock[Result]

      val checkUserExists = new CheckUserExists(_ => onFailure)(authService)

      Await.result(checkUserExists.filter(request),timeout).isDefined must equalTo(false)

      authService.find("test@test.com") returns None
      Await.result(checkUserExists.filter(request),timeout).isDefined must equalTo(true)

    }

    "get a user based on its session cookie" in {

      session.get("username") returns Option("test@test.com")
      authService.find("test@test.com") returns Some(user)

      val getUserBySession = new GetUserBySession(authService)

      val result1 = Await.result(getUserBySession.transform(request),timeout)

      result1.user.name must beEqualTo("test@test.com")

    }

    "check if a user has a particular permission" in {

      user.permissions returns Seq("a","b")

      val onUnauthorized = (user:User) => Results.Forbidden

      val checkPermission1 = new CheckPermission(onUnauthorized)(Seq())
      val checkPermission2 = new CheckPermission(onUnauthorized)(Seq("c","d","e"))
      val checkPermission3 = new CheckPermission(onUnauthorized)(Seq("a"))

      val result1 = Await.result(checkPermission1.filter(userRequest),timeout)
      val result2 = Await.result(checkPermission2.filter(userRequest),timeout)
      val result3 = Await.result(checkPermission3.filter(userRequest),timeout)

      result1.isDefined must beEqualTo(true)
      result1.get must beEqualTo(Results.Forbidden)

      result2.isDefined must beEqualTo(true)
      result3.isDefined must beEqualTo(false)
    }

    "check if a user has a particular role" in {

      user.roles returns Seq("a","b")

      val onUnauthorized = (user:User) => Results.Forbidden

      val check1 = new CheckRoles(onUnauthorized)(Seq())
      val check2 = new CheckRoles(onUnauthorized)(Seq("c","d","e"))
      val check3 = new CheckRoles(onUnauthorized)(Seq("a"))

      val result1 = Await.result(check1.filter(userRequest),timeout)
      val result2 = Await.result(check2.filter(userRequest),timeout)
      val result3 = Await.result(check3.filter(userRequest),timeout)

      result1.isDefined must beEqualTo(true)
      result1.get must beEqualTo(Results.Forbidden)

      result2.isDefined must beEqualTo(true)
      result3.isDefined must beEqualTo(false)
    }



  }

}
