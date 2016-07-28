package models.fhir

import org.joda.time.DateTime

case class Annotation(
  author: Option[String],
  time: Option[DateTime],
  text: String
)
