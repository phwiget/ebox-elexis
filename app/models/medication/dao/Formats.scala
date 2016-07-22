package models.medication.dao

import models.fhir.converters.Formats._
import models.medication.{DosageInstruction, MedicationOrder}
import play.api.libs.json.Json

object Formats {

  implicit val dosageInstructionFormat = Json.format[DosageInstruction]
  implicit val medicationOrderFormat = Json.format[MedicationOrder]


}
