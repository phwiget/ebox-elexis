package models.medication

import models.medication.dao.MedicationDAO
import models.request.UserRequest
import org.specs2.mock.Mockito
import play.api.mvc.AnyContent
import play.api.test.PlaySpecification

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

class MedicationServiceSpec extends PlaySpecification with Mockito{

  val dao = mock[MedicationDAO]
  val service = new MedicationService(dao)

  "Medication service" should {

    "return the active medications or the whole history" in {

      val request = mock[UserRequest[AnyContent]]
      val id = "ID"
      val order1 = mock[MedicationOrder]
      val order2 = mock[MedicationOrder]
      order1.isHistory returns false
      order2.isHistory returns true

      dao.list(id)(request) returns Future(Right(Seq(order1,order2)))

      await(service.list(id)(request)).right.get.length must equalTo(1)

      await(service.list(id, history = true)(request)).right.get.length must equalTo(2)

    }

  }

}
