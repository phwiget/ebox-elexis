package models.medication

import models.fhir.{Annotation, CodeableConcept, Coding, Event}
import org.joda.time.DateTime

trait SampleMedicationOrders {

  private val instructions1 = DosageInstruction(Some("1-0-1-0"),Some(CodeableConcept(Seq.empty,Some("Addition"))))
  private val event1 = Event("active", new DateTime(2015,2,3,0,0,0), None, None)
  private val medicationCodeableConcept = CodeableConcept(Seq(Coding(Some("urn:oid:1.3.160"), Some("GTIN"))), Some("Medication 1"))
  private val annotation1 = Annotation(None,None, "Before bed")


  val order1 = MedicationOrder("id", Seq.empty,"UNKNOWN",None, "abc",Seq.empty,medicationCodeableConcept, Seq(instructions1), Seq(event1))
  val order2 = MedicationOrder("id", Seq("id"),"UNKNOWN",Some("active"), "abc",Seq(annotation1),medicationCodeableConcept, Seq.empty, Seq.empty)


}
