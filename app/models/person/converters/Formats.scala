package models.person.converters

import models.person.HumanName
import play.api.libs.json.Json

object Formats {

  implicit val humanNameFormat = Json.format[HumanName]


}
