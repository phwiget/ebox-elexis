package controllers.patient


import models.patient.Patient
import models.person.converters.Formats._
import play.api.libs.json.{JsValue, Json, Writes}

object Formats {

  implicit val patientFormat = Json.format[Patient]


}
