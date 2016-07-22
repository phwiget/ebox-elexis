package models.medication

import models.fhir.CodeableConcept
import org.joda.time.DateTime

case class MedicationOrder(
  id: String,
  identifier: Seq[String],
  dateWritten: Option[DateTime],
  dateEnded: Option[DateTime],
  reasonEnded: Option[String],
  note: Option[String],
  medicationCodeableConcept: CodeableConcept,
  dosageInstructions: Seq[DosageInstruction]
) {

  lazy val hasEnded: Boolean = dateEnded.isDefined

}
