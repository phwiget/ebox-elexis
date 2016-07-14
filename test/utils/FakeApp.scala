package utils

import play.api.{Application, Play}
import play.api.inject.guice.GuiceApplicationBuilder

/**
  * Fake App to run tests
  */
object FakeApp {

  var application: Application = null

  def apply() = {

    if (application == null) {
      application = new GuiceApplicationBuilder().configure(TestConfig()).build()
      Play.start(application)

      println("starting app...")

      application
    } else application

  }
}
