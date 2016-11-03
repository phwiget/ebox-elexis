package models.medication

import org.joda.time.DateTime
import play.api.test.PlaySpecification
import XmlReads._

class XmlReadsSpec extends PlaySpecification with Samples{

  "Xml reads" should {

    "convert a XML into a DosageInstruction" in {

      val d1 = dosageInstructionReads(dosageInstruction1)
      d1.text must equalTo(Some("1-1-0-1"))

      val d2 = dosageInstructionReads(dosageInstruction2)
      d2.additionalInstructions.get.text.get must equalTo("Only if not on beta-Lactam")

    }

    "convert a XML into a MedicalOrder" in {

      val o1 = medicationOrderReads(order1)
      o1.id must equalTo("Ff60020d714950f83034")
      o1.identifier.head must equalTo(o1.id)
      o1.entryType must equalTo(Constants.EntryTypes.ReserveMedication)
      o1.status.get must equalTo("completed")
      o1.patientId must equalTo("h3601b347f538282b065")
      o1.medicationCodeableConcept.codings.head.code.get must equalTo("A10BH01")
      o1.medicationCodeableConcept.text.get must equalTo("JANUVIA 100 mg Filmtabl")
      o1.dosageInstructions.head.text must equalTo(Some("1-1-0-1"))
      o1.eventHistory.head.dateTime must equalTo(new DateTime(2016,7,27,11,51,36))
      o1.eventHistory.head.status must equalTo("active")
      o1.eventHistory.last.dateTime must equalTo(new DateTime(2016,7,28,11,51,36))
      o1.eventHistory.last.status must equalTo("stopped")
      o1.eventHistory.last.reason.get.text.get must equalTo("Geändert durch Wiget Philipp")

    }

    "convert a XML into MedicalOrders" in {

      val orders = medicationOrdersReads(orders1)
      orders.length must equalTo(4)

    }

    "convert a XML into an optional MedicalOrder" in {

      val order = mayBeMedicationOrderReads(orders2)
      order.isEmpty must equalTo(true)

    }
  }

}
