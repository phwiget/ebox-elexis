package models.fhir.converters

import models.fhir.{Annotation, CodeableConcept, Coding, Event}
import play.api.libs.json.Json

object Formats {

  implicit val codingFormat = Json.format[Coding]
  implicit val codeableConceptFormat = Json.format[CodeableConcept]
  implicit val annotationFormat = Json.format[Annotation]
  implicit val eventHistoryFormat = Json.format[Event]
}
