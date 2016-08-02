package models.medication

import models.fhir.{Annotation, CodeableConcept, Event}
import org.joda.time.DateTime
import org.specs2.mock.Mockito
import play.api.test.PlaySpecification


class MedicationOrderSpec extends PlaySpecification with Mockito{

  "Medication Order" should {

    "tell if its part of the history" in {

      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN", None,Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)
      val order2 = MedicationOrder("", Seq.empty,"UNKNOWN",Some("completed"),Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.isHistory must equalTo(false)
      order2.isHistory must equalTo(true)

    }

    "tell if its a reserve medication" in {

      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN", None,Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)
      val order2 = MedicationOrder("", Seq.empty,"RESERVE_MEDICATION",None,Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.isReserve must equalTo(false)
      order2.isReserve must equalTo(true)

    }


    "return the aggregated note" in {

      val annotation = Annotation(None,None,"Test")
      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN",None,Seq(annotation),mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.note must equalTo("Test")

    }
    "return the date written" in {

      val event = Event("active", new DateTime(2016,3,2,1,0,0),None,None)
      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN",None,Seq.empty,mock[CodeableConcept], Seq.empty, Seq(event))
      val order2 = MedicationOrder("", Seq.empty,"UNKNOWN",Some("completed"),Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.dateWritten must equalTo(Some(new DateTime(2016,3,2,1,0,0)))
      order2.dateWritten must equalTo(None)

    }

    "return the date ended" in {

      val event = Event("stopped", new DateTime(2016,3,2,1,0,0),None,None)
      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN",None,Seq.empty,mock[CodeableConcept], Seq.empty, Seq(event))
      val order2 = MedicationOrder("", Seq.empty,"UNKNOWN",Some("completed"),Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.dateEnded must equalTo(Some(new DateTime(2016,3,2,1,0,0)))
      order2.dateEnded must equalTo(None)

    }

    "return the aggregated reason ended" in {

      val event = Event("stopped", new DateTime(2016,3,2,1,0,0),None,Some(CodeableConcept(Seq.empty,Some("Reason"))))
      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN",None,Seq.empty,mock[CodeableConcept], Seq.empty, Seq(event))
      val order2 = MedicationOrder("", Seq.empty,"UNKNOWN",Some("completed"),Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.reasonEnded must equalTo(Some("Reason"))
      order2.reasonEnded must equalTo(None)

    }

    "return the aggregated instructions" in {

      val instructions = DosageInstruction(Some("1-0-1-0"))
      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN",None,Seq.empty,mock[CodeableConcept], Seq(instructions), Seq.empty)
      val order2 = MedicationOrder("", Seq.empty,"UNKNOWN",Some("completed"),Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.instructions must equalTo("1-0-1-0")
      order2.instructions must equalTo("")

    }
    "return the aggregated additional instructions" in {

      val instructions = DosageInstruction(Some("1-0-1-0"),Some(CodeableConcept(Seq.empty,Some("Addition"))))
      val order1 = MedicationOrder("", Seq.empty,"UNKNOWN",None,Seq.empty,mock[CodeableConcept], Seq(instructions), Seq.empty)
      val order2 = MedicationOrder("", Seq.empty,"UNKNOWN",Some("completed"),Seq.empty,mock[CodeableConcept], Seq.empty, Seq.empty)

      order1.additionalInstructions must equalTo("Addition")
      order2.additionalInstructions must equalTo("")

    }
  }

}
