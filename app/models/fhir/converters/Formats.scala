package models.fhir.converters

import models.fhir.{CodeableConcept, Coding}
import play.api.libs.json.Json

object Formats {

  implicit val codingFormat = Json.format[Coding]
  implicit val codeableConceptFormat = Json.format[CodeableConcept]


}
