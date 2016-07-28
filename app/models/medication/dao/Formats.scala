package models.medication.dao

import models.fhir.converters.Formats._
import models.medication.{DosageInstruction, MedicationOrder}
import play.api.libs.json.{JsValue, Json, Writes}

object Formats {

  implicit val dosageInstructionFormat = Json.format[DosageInstruction]
  implicit val medicationOrderFormat = Json.format[MedicationOrder]

  implicit val medicationOrderWrites = new Writes[MedicationOrder] {
    override def writes(m: MedicationOrder): JsValue = Json.obj(

      "id" -> m.id,
      "status" -> m.status,
      "notes" -> m.note,
      "dateWritten" -> m.dateWritten,
      "dateEnded" -> m.dateEnded,
      "reasonEnded" -> m.reasonEnded,
      "medicationCodeableConcept" -> m.medicationCodeableConcept,
      "instructions" -> m.instructions,
      "additionalInstructions" -> m.additionalInstructions

    )
  }

}
