package models.medication.dao

import models.fhir.converters.Converters._
import models.medication.{DosageInstruction, MedicationOrder}
import org.joda.time.DateTime
import org.joda.time.format.{DateTimeFormat, ISODateTimeFormat}

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
      (xml \ "id" \ "@value").text,
      (xml \\ "identifier").map(i => (i \ "value" \ "@value").text),
      (xml \ "dateWritten" \ "@value").headOption.map(d => DateTime.parse(d.text,dateFormatter)),
      (xml \ "dateEnded" \ "@value").headOption.map(d => DateTime.parse(d.text,dateFormatter)),
      (xml \ "reasonEnded" \ "@value").headOption.map(_.text),
      (xml \ "note" \ "@value").headOption.map(_.text),
      (xml \ "medicationCodeableConcept").map(codeableConceptConverter).head,
      (xml \\ "dosageInstruction").map(dosageInstructionConverter)
    )

  }

  implicit val mayBeMedicationOrderConverter = (xml: NodeSeq) => {

      (xml \ "MedicationOrder").headOption.map(medicationOrderConverter)

  }

  implicit val medicationOrdersConverter = (xml: NodeSeq) => {

    (xml \\ "MedicationOrder").map(medicationOrderConverter)

  }

}
