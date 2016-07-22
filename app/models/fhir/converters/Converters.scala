package models.fhir.converters

import models.fhir.{CodeableConcept, Coding}

import scala.xml.NodeSeq

object Converters {

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

}
