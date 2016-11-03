package models.medication

import models.fhir.formats.XmlReads._
import models.patient.XmlReads._
import models.medication.Constants._
import org.joda.time.format.ISODateTimeFormat

import scala.xml.NodeSeq

object XmlReads {

  lazy val dateFormatter = ISODateTimeFormat.dateTimeNoMillis()

  implicit val dosageInstructionReads = (xml: NodeSeq) => {

      DosageInstruction(
        (xml \ "text" \ "@value").headOption.map(_.text),
        (xml \ "additionalInstructions").headOption.map(codeableConceptReads)
      )

  }


  implicit val medicationOrderReads = (xml: NodeSeq) => {

    MedicationOrder(
      (xml \  "id" \ "@value").text,
      (xml \\ "identifier").map(i => (i \ "value" \ "@value").text),
      (xml \ "extension").map(e => (e \ "valueCode" \ "@value").text).headOption.getOrElse(EntryTypes.Unknown),
      (xml \  "status" \ "@value").headOption.map(_.text),
      (xml \ "patient" \ "@id").text,
      (xml \\ "note").map(annotationReads),
      (xml \  "medicationCodeableConcept").map(codeableConceptReads).head,
      (xml \\ "dosageInstruction").map(dosageInstructionReads),
      (xml \\ "eventHistory").map(eventHistoryReads)
    )

  }

  implicit val mayBeMedicationOrderReads = (xml: NodeSeq) => {

      (xml \ "MedicationOrder").headOption.map(medicationOrderReads)

  }

  implicit val medicationOrdersReads = (xml: NodeSeq) => {

    (xml \\ "MedicationOrder").map(medicationOrderReads)

  }

}
