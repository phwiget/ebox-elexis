package controllers

import play.api.data.validation.ValidationError
import play.api.i18n.Messages
import play.api.libs.json.{JsPath, Json}

object Errors {

  def toJson(e: Seq[(JsPath, scala.Seq[ValidationError])])(implicit messages: Messages) = {

      e.foldLeft(Json.obj()){(json,e) =>

        json ++ Json.obj(e._1.toJsonString.replace("obj.","").replace("obj", "error") -> Messages(e._2.head.message, e._2.head.args))

      }

  }

  def toJson(e: String)(implicit messages: Messages) = Json.obj("error" -> Messages(e))

}
