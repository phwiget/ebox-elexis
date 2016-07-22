package models.medication

import models.fhir.CodeableConcept
import org.joda.time.DateTime
import org.specs2.mock.Mockito
import play.api.test.PlaySpecification

class MedicationOrderSpec extends PlaySpecification with Mockito{

  "Medication Order" should {

    "says it has ended when a ending date is defined" in {

      val orde1 = MedicationOrder("", Seq.empty,None,None,None,None,mock[CodeableConcept], Seq.empty)
      val orde2 = MedicationOrder("", Seq.empty,None,Some(new DateTime(2016,2,2,0,0,0)),None,None,mock[CodeableConcept], Seq.empty)

      orde1.hasEnded must equalTo(false)
      orde2.hasEnded must equalTo(true)


    }

  }

}
