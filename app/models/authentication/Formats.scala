package models.authentication

import models.user.{ElexisUser, User}
import play.api.libs.json._

object Formats {

  implicit val credentialsFormat = Json.format[Credentials]

  implicit val userFormat = Json.format[ElexisUser]


}
