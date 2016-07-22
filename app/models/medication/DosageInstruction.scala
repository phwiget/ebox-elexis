package models.medication

import models.fhir.CodeableConcept

case class DosageInstruction(
  text: Option[String],
  additionalInstructions: Option[CodeableConcept] = None
)
