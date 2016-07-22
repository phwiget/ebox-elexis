package models.fhir

case class CodeableConcept(
  codings: Seq[Coding],
  text: Option[String]
)
