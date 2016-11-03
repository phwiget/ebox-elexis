package models.fhir.formats

import models.fhir.{Annotation, CodeableConcept, Coding, Event}
import org.joda.time.DateTime
import org.joda.time.format.ISODateTimeFormat

import scala.xml.NodeSeq

object XmlReads {

  private lazy val dateFormatter = ISODateTimeFormat.dateTimeNoMillis()

  implicit val contentLocationReads = (xml: NodeSeq) => (xml \ "@url").headOption.map(_.text).getOrElse("")

  implicit val codingReads = (xml: NodeSeq) =>

    Coding(
      (xml \ "system" \ "@value").headOption.map(_.text),
      (xml \ "code" \ "@value").headOption.map(_.text)
    )

  implicit val codeableConceptReads = (xml: NodeSeq) =>

    CodeableConcept(
      (xml \\ "coding").map(codingReads),
      (xml \ "text" \ "@value").headOption.map(_.text)
    )

  implicit val annotationReads = (xml: NodeSeq) =>

    Annotation(
      (xml \ "author" \ "@value").headOption.map(_.text),
      (xml \ "time" \ "@value").headOption.map(d => DateTime.parse(d.text,dateFormatter)),
      (xml \ "text" \ "@value").text
    )

  implicit val eventHistoryReads = (xml: NodeSeq) =>

    Event(
      (xml \ "status" \ "@value").text,
      (xml \ "dateTime" \ "@value").headOption.map(d => DateTime.parse(d.text,dateFormatter)).get,
      (xml \ "action" ).headOption.map(codeableConceptReads),
      (xml \ "reason" ).headOption.map(codeableConceptReads)
    )
}
