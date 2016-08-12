package models.medication

import models.fhir.converters.Converters._
import models.medication.Constants._
import org.joda.time.format.ISODateTimeFormat

import scala.xml.NodeSeq

object Converters {

  lazy val dateFormatter = ISODateTimeFormat.dateTimeNoMillis()

  implicit val dosageInstructionConverter = (xml: NodeSeq) => {

      DosageInstruction(
        (xml \ "text" \ "@value").headOption.map(_.text),
        (xml \ "additionalInstructions").headOption.map(codeableConceptConverter)
      )

  }


  implicit val medicationOrderConverter = (xml: NodeSeq) => {

    MedicationOrder(
      (xml \  "id" \ "@value").text,
      (xml \\ "identifier").map(i => (i \ "value" \ "@value").text),
      (xml \ "extension").map(e => (e \ "valueCode" \ "@value").text).headOption.getOrElse(EntryTypes.Unknown),
      (xml \  "status" \ "@value").headOption.map(_.text),
      (xml \\ "note").map(annotationConverter),
      (xml \  "medicationCodeableConcept").map(codeableConceptConverter).head,
      (xml \\ "dosageInstruction").map(dosageInstructionConverter),
      (xml \\ "eventHistory").map(eventHistoryConverter)
    )

  }

  implicit val mayBeMedicationOrderConverter = (xml: NodeSeq) => {

      (xml \ "MedicationOrder").headOption.map(medicationOrderConverter)

  }

  implicit val medicationOrdersConverter = (xml: NodeSeq) => {

    (xml \\ "MedicationOrder").map(medicationOrderConverter)

  }

}
