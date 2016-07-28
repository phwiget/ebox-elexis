package models.fhir.converters

import models.fhir.{Annotation, CodeableConcept, Coding, Event}
import org.joda.time.DateTime
import org.joda.time.format.ISODateTimeFormat

import scala.xml.NodeSeq

object Converters {

  lazy val dateFormatter = ISODateTimeFormat.dateTimeNoMillis()

  implicit val codingConverter = (xml: NodeSeq) =>

    Coding(
      (xml \ "system" \ "@value").headOption.map(_.text),
      (xml \ "code" \ "@value").headOption.map(_.text)
    )

  implicit val codeableConceptConverter = (xml: NodeSeq) =>

    CodeableConcept(
      (xml \\ "coding").map(codingConverter),
      (xml \ "text" \ "@value").headOption.map(_.text)
    )

  implicit val annotationConverter = (xml: NodeSeq) =>

    Annotation(
      (xml \ "author" \ "@value").headOption.map(_.text),
      (xml \ "time" \ "@value").headOption.map(d => DateTime.parse(d.text,dateFormatter)),
      (xml \ "text" \ "@value").text
    )

  implicit val eventHistoryConverter = (xml: NodeSeq) =>

    Event(
      (xml \ "status" \ "@value").text,
      (xml \ "dateTime" \ "@value").headOption.map(d => DateTime.parse(d.text,dateFormatter)).get,
      (xml \ "action" ).headOption.map(codeableConceptConverter),
      (xml \ "reason" ).headOption.map(codeableConceptConverter)
    )
}
