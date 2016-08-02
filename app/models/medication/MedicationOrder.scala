package models.medication

import models.fhir.{Annotation, CodeableConcept, Event}
import Constants._
import org.joda.time.DateTime

case class MedicationOrder(
  id: String,
  identifier: Seq[String],
  entryType: String,
  status: Option[String],
  notes: Seq[Annotation],
  medicationCodeableConcept: CodeableConcept,
  dosageInstructions: Seq[DosageInstruction],
  eventHistory: Seq[Event]
) {

  lazy val isHistory: Boolean = status.contains(Completed)
  lazy val isReserve: Boolean = entryType == Constants.EntryTypes.ReserveMedication

  lazy val note = notes.map(_.text).mkString(", ")
  lazy val article = medicationCodeableConcept.text
  lazy val dateWritten: Option[DateTime] = eventHistory.find(_.status == Active).map(_.dateTime)
  lazy val dateEnded: Option[DateTime] = eventHistory.find(_.status == Stopped).map(_.dateTime)
  lazy val reasonEnded: Option[String] = eventHistory.find(_.status == Stopped).flatMap(_.reason.flatMap(_.text))
  lazy val instructions = dosageInstructions.flatMap(_.text).mkString(", ")
  lazy val additionalInstructions = dosageInstructions.flatMap(_.additionalInstructions.flatMap(_.text)).mkString(", ")

}
