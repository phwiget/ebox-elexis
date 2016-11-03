package models.medication

import models.fhir.{Annotation, CodeableConcept, Event}
import org.joda.time.DateTime
import org.specs2.mock.Mockito
import play.api.libs.json.JsError
import play.api.test.PlaySpecification

class FormatsSpec extends PlaySpecification with Mockito with FormatSamples{

  "Format" should {

    "read a json as MedicationOrder" in {

      val result1 = order1.validate(Formats.medicationOrderReads)

      result1.isSuccess must equalTo(true)
      result1.get.id must equalTo("57b2133597ec42dda3670495")
      result1.get.identifier must equalTo(Seq("57b2133597ec42dda3670495"))
      result1.get.entryType must equalTo("UNKNOWN")
      result1.get.notes must equalTo(List(Annotation(None,None,"Test")))
      result1.get.status must equalTo(None)
      result1.get.patientId must equalTo("")
      result1.get.medicationCodeableConcept must equalTo(CodeableConcept(Seq.empty, None))
      result1.get.dosageInstructions must equalTo(List(DosageInstruction(Some("3-0-1-0"),Some(CodeableConcept(List(),Some("Test2"))))))
      result1.get.eventHistory must equalTo(List(Event("active",new DateTime(2016,11,2,18,27,16,0),None,None)))

      val result2 = order2.validate(Formats.medicationOrderReads)
      result2.isSuccess must equalTo(true)
      result2.get.entryType must equalTo("RESERVE_MEDICATION")

      val result3 = order3.validate(Formats.medicationOrderReads)
      result3.isSuccess must equalTo(true)
      result3.get.eventHistory must equalTo(List(Event("active",new DateTime(2016,11,2,18,27,16,0),None,None), Event("stopped",new DateTime(2016,11,3,8,19,12, 262),None,Some(CodeableConcept(List(),Some("Test"))))))

    }

    "validate the MedicationOrder" in {

      val result1 = error1.validate(Formats.medicationOrderReads)
      val result2 = error2.validate(Formats.medicationOrderReads)

      result1.isError must equalTo(true)
      result2.isError must equalTo(true)

      result1 match {
        case JsError(e) =>
          e.head._2.head.message must equalTo("error.dateEnded.before.dateWritten")
          success
        case _ => success
      }

      result2 match {
        case JsError(e) =>
          e.head._2.head.message must equalTo("error.path.missing")
          e.head._1.toJsonString must equalTo("obj.status")
          success
        case _ => success
      }


    }

  }


}
