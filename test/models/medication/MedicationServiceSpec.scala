package models.medication

import models.fhir.{Annotation, CodeableConcept, Event}
import models.medication.dal.MedicationDAO
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

    "return the resource location of the newly created medication" in {

      implicit val request = mock[UserRequest[AnyContent]]

      val order1 = mock[MedicationOrder]
      val order2 = mock[MedicationOrder]
      val order3 = mock[MedicationOrder]

      order2.update(order1) returns order3

      order1.id returns "abc"
      order2.id returns "xyz"

      dao.detail("abc") returns Future(Right(order2))
      dao.detail("xyz") returns Future(Left("error"))

      dao.update(order3) returns Future(Right("http://localhost:8380/fhir/MedicationOrder/F53e80ca672ea469034"))
      dao.update(order2) returns Future(Left("error"))

      await(service.update(order1)(request)).right.get must equalTo("F53e80ca672ea469034")
      await(service.update(order2)(request)).left.get must equalTo("error")

    }


  }

}
