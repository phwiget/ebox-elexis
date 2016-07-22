package models.fhir

case class Coding(
  system: Option[String],
  code: Option[String]
)
