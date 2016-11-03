package utils

import play.api.data.validation.ValidationError
import play.api.i18n.Messages
import play.api.libs.json._

object JsonUtils {

  implicit class JsErrorToJson(val e: Seq[(JsPath, scala.Seq[ValidationError])]) {

    def toJson(implicit m: Messages) = e.foldLeft(Json.obj("error" -> Messages("error.default.message"))){ (obj, error) =>

      obj ++ Json.obj(error._1.toJsonString.replace("obj","error") -> Messages(error._2.head.message) )

    }

  }

}

