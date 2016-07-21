package models

import org.specs2.mock.Mockito
import play.api.test.PlaySpecification

class EndpointsSpec extends PlaySpecification with Mockito{

  val endpoints = new Endpoints

  "Endpoint" should {

    "return endpoints" in {

      endpoints.BaseUrl must equalTo("http://localhost:8380/fhir")

    }

    "url-encode query parameters" in {

      val p1 = "this is a test"
      val p2 = "this ? is a & difficult test ä"

      endpoints.query("test",p1) must equalTo("?test=this+is+a+test")
      endpoints.query(Map("name" -> p1, "address" -> p2)) must equalTo("?name=this+is+a+test&address=this+%3F+is+a+%26+difficult+test+%C3%A4")

    }

  }

}
