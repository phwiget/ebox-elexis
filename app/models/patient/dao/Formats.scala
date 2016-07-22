package models.patient.dao

import models.patient.Patient
import play.api.libs.json.Json
import models.person.converters.Formats._

object Formats {

  implicit val patientFormat = Json.format[Patient]


}
