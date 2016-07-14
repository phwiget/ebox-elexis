package utils

import akka.stream.Materializer
import org.specs2.mutable.Before
import play.api.Application

/**
  * Creates a single instance of the application for all test that run within the suite
  */
trait SingleInstance extends Before{

  var application: Application = null
  implicit var mat: Materializer = null

  def before() {

    application = FakeApp()
    mat = application.materializer

  }

}
