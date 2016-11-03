package models.medication

import models.fhir.{Annotation, CodeableConcept, Event}
import org.joda.time.DateTime
import play.api.data.validation.ValidationError
import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._
import utils.JsonReads._

object Formats {

  import models.fhir.formats.Formats._
  import models.patient.Formats._

  implicit val dosageInstructionFormat = Json.format[DosageInstruction]
  implicit val medicationOrderFormat = Json.format[MedicationOrder]

  implicit val medicationOrderWrites = new Writes[MedicationOrder] {
    override def writes(m: MedicationOrder): JsValue = JsObject(

        Json.obj(

          "id" -> m.id,
          "status" -> m.status,
          "isHistory" -> optimize(m.isHistory),
          "isReserve" -> optimize(m.isReserve),
          "notes" -> optimize(m.note),
          "dateWritten" -> m.dateWritten,
          "dateEnded" -> m.dateEnded,
          "reasonEnded" -> m.reasonEnded,
          "article" -> m.article,
          "instructions" -> optimize(m.instructions),
          "additionalInstructions" -> optimize(m.additionalInstructions)

        ).fields.filterNot{case(_,v) => v == JsNull}

      )

    private def optimize(v: Boolean) = if (v) Some(true) else None
    private def optimize(v: String) = if (v.nonEmpty) Some(v) else None

  }


  val validateDates = (mo: MedicationOrder) => if (mo.dateEnded.isDefined && mo.dateWritten.isDefined) !mo.dateEnded.get.isBefore(mo.dateWritten.get) else true

  private val events = (status: String, dateWritten: DateTime, dateEnded: Option[DateTime], reasonEnded: Option[String]) => {

    Seq(Event(status, dateWritten, None, None)) ++
      {if (dateEnded.isDefined) Seq(Event(Constants.Stopped, dateEnded.get, None, reasonEnded.map(r => CodeableConcept(Seq.empty, Some(r))))) else Seq.empty}

  }

  implicit val medicationOrderReads: Reads[MedicationOrder] = (
    (JsPath \ "id").read[String](minLength[String](1)) and
    (JsPath \ "isReserve").readNullable[Boolean] and
    (JsPath \ "status").read[String] and
    (JsPath \ "notes").readNullable[String] and
    (JsPath \ "dateWritten").read[DateTime] and
    (JsPath \ "dateEnded").readNullable[DateTime] and
    (JsPath \ "reasonEnded").readNullable[String] and
    (JsPath \ "instructions").readNullable[String] and
    (JsPath \ "additionalInstructions").readNullable[String]
    )(
    (id,  isReserve, status, notes, dateWritten, dateEnded, reasonEnded, instructions, additionalInstructions) =>
      MedicationOrder(
        id,
        Seq(id),
        if (isReserve.getOrElse(false)) Constants.EntryTypes.ReserveMedication else Constants.EntryTypes.Unknown,
        None,
        "",
        notes.map(n => Seq(Annotation(None, None, n))).getOrElse(Seq.empty),
        CodeableConcept(Seq.empty, None),
        Seq(DosageInstruction(instructions, additionalInstructions.map(ai => CodeableConcept(Seq.empty, Some(ai))))),
        events(status, dateWritten, dateEnded, reasonEnded)
      )
    ).filter(ValidationError("error.dateEnded.before.dateWritten"))(validateDates)


}
