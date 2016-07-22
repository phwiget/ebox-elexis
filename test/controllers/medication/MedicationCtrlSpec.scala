package controllers.medication

import java.lang.String

import helpers.{RequestHelpers, Sessions}
import play.api.test.{FakeRequest, PlaySpecification}

class MedicationCtrlSpec extends PlaySpecification with Sessions with RequestHelpers{

  "Medication Controller" should {

    "return a list of medications for a particular patient" in {

      val url = controllers.medication.routes.MedicationCtrl.list(_: String).url

      val request = route(application, FakeRequest(GET,url("abc")).withSession(session:_ *)).get
      val requestUnauthorized = route(application, FakeRequest(GET,url("abc")).withSession(unauthorized:_ *)).get

//      status(request) must equalTo(400)
      status(requestUnauthorized) must equalTo(303)

    }

  }

}
