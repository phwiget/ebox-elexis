package helpers

import models.user.User
import org.specs2.mock.Mockito
import play.api.cache.CacheApi

trait Sessions extends SingleInstance with Mockito{

  val user = mock[User]
  user.name returns "test1"

  val admin = mock[User]
  val physician = mock[User]
  val assistant = mock[User]

  override def before() = {

    application = FakeApp()
    mat = application.materializer

    val cache = application.injector.instanceOf[CacheApi]

    cache.getOrElse[User]("users_test1")(user)
    cache.getOrElse[User]("users_test2")(admin)
    cache.getOrElse[User]("users_test3")(physician)
    cache.getOrElse[User]("users_test4")(assistant)

  }

}
