package utils

import org.specs2.mock.Mockito
import play.api.data.validation.ValidationError
import play.api.i18n.Messages
import play.api.libs.json._
import play.api.test.PlaySpecification
import utils.JsonUtils.JsErrorToJson

class JsonUtilsSpec extends PlaySpecification with Mockito{

  "Json utils" should {

    "implicitly convert a JsError to a proper json" in {

      val messages = mock[Messages]
      messages("test") returns "Test Error"
      messages("error.default.message") returns "Default message"

      val e1 = JsError("test")
      val p:JsPath = JsPath.apply(List(KeyPathNode.apply("property")))
      val e2 = JsError((p, ValidationError("test")))

      val converter1 = new JsErrorToJson(e1.errors)
      val converter2 = new JsErrorToJson(e2.errors)

      converter1.toJson(messages) must equalTo(Json.obj("error" -> "Test Error"))
      converter2.toJson(messages) must equalTo(Json.obj("error" -> "Default message", "error.property" -> "Test Error"))

    }

  }
}
