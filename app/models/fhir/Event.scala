package models.fhir

import org.joda.time.DateTime

case class Event(
   status: String,
   dateTime: DateTime,
   action: Option[CodeableConcept],
   reason: Option[CodeableConcept]
)

