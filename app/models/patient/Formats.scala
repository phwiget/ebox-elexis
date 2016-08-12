package models.patient

import play.api.libs.json.Json

object Formats {

  import models.person.converters.Formats._

  implicit val patientFormat = Json.format[Patient]


}
