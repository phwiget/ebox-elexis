package utils

import org.joda.time.DateTime
import play.api.libs.json._

object JsonReads {

  implicit object DateReads extends Reads[DateTime] {
    def reads(json: JsValue) = json match {
      case JsNumber(n) if n.isValidLong => JsSuccess(new DateTime(n.toLong))
      case JsNumber(n) => JsError("error.expected.date.time")
      case _ => JsError("error.expected.date.time")
    }
  }

}
