package models.medication.dao

import models.fhir.converters.Formats._
import models.medication.{DosageInstruction, MedicationOrder}
import play.api.libs.json.Json.JsValueWrapper
import play.api.libs.json._

object Formats {

  implicit val dosageInstructionFormat = Json.format[DosageInstruction]
  implicit val medicationOrderFormat = Json.format[MedicationOrder]

  implicit val medicationOrderWrites = new Writes[MedicationOrder] {
    override def writes(m: MedicationOrder): JsValue = JsObject(

        Json.obj(

          "id" -> m.id,
          "status" -> m.status,
          "isHistory" -> optimize(m.isHistory),
          "isReserve" -> optimize(m.isReserve),
          "notes" -> optimize(m.note),
          "dateWritten" -> m.dateWritten,
          "dateEnded" -> m.dateEnded,
          "reasonEnded" -> m.reasonEnded,
          "article" -> m.article,
          "instructions" -> optimize(m.instructions),
          "additionalInstructions" -> optimize(m.additionalInstructions)

        ).fields.filterNot{case(_,v) => v == JsNull}

      )

    private def optimize(v: Boolean) = if (v) Some(true) else None
    private def optimize(v: String) = if (v.nonEmpty) Some(v) else None

  }

}
