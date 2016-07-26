package controllers

import java.io.ByteArrayInputStream
import java.util.zip.GZIPInputStream

import controllers.Assets.Asset
import helpers.{FakeCache, SingleInstance}
import org.specs2.mock.Mockito
import play.api.i18n.{Lang, Messages, MessagesApi}
import play.api.{Configuration, Environment, Mode}
import play.api.test.{FakeRequest, PlaySpecification}

import scala.concurrent.ExecutionContext.Implicits.global

class ResourcesSpec extends PlaySpecification with SingleInstance with Mockito{sequential

  val environment = mock[Environment]
  environment.mode returns  Mode.Dev

  val cache = new FakeCache
  val conf = mock[Configuration]
  conf.getString("play.frontend.path") returns Some("test/resources/controllers/")


  val messagesApi = mock[MessagesApi]
  val controller = new Resources(environment,conf,cache)(messagesApi)

  "Resources" should {

    "get a resources from disk while developing" in {

      val request1 = FakeRequest("GET","/")
      val result1 = controller.get("test/resources/controllers/",Asset("javascript.js"))(request1)
      val result2 = controller.get("test/resources/controllers/",Asset("style.css"))(request1)

      status(result1) must equalTo(200)
      contentAsString(result1) must equalTo("var x = 123;")
      contentType(result1) must equalTo(Some("application/javascript"))

      status(result2) must equalTo(400)

    }

    "get a resources from assets in production" in {

      environment.mode returns  Mode.Prod

      val request1 = FakeRequest("GET","assets/javascript.js")
      val result1 = controller.get("/public",Asset("javascript.js"))(request1)

      status(result1) must equalTo(404)

    }

    "get a html-template from disk while developing in German" in {

      environment.mode returns  Mode.Dev

      val request1 = FakeRequest("GET","/")

      val messages = mock[Messages]
      val lang = Lang("de")
      messages.lang returns lang

      messagesApi.preferred(request1) returns messages
      messagesApi("test.test")(lang) returns "In German"
      messagesApi("test.test1")(lang) returns "Oh Yeah"

      val result1 = controller.get("test/resources/controllers/",Asset("template.html"))(request1)

      status(result1) must equalTo(200)

      await(result1.map{r =>

        r.header.headers must equalTo(
          Map("ETag" -> "f708426433cb7fc2ae2e12c9d4d07dc8", "Content-Type" -> "text/html; charset=utf-8", "Cache-Control" -> "public, max-age=0", "Content-Encoding" -> "gzip")
        )
      })

      val bytes = new ByteArrayInputStream(contentAsBytes(result1).toArray)
      val gis: GZIPInputStream  = new GZIPInputStream(bytes)
      val scanner = new java.util.Scanner(gis).useDelimiter("\\A")

      scanner.next() must equalTo("<p>This is a test</p><p>In German</p><h1>Oh Yeah</h1><img src=\"/resources/test.test\"/><img src=\"/resources/test.test1\"/>")

    }

    "get a html-template from disk while developing in French" in {

      environment.mode returns  Mode.Dev

      val request1 = FakeRequest("GET","/")

      val messages = mock[Messages]
      val lang = Lang("fr")
      messages.lang returns lang

      messagesApi.preferred(request1) returns messages
      messagesApi("test.test")(lang) returns "In French"
      messagesApi("test.test1")(lang) returns "Uh uh"

      val result1 = controller.get("test/resources/controllers/",Asset("template.html"))(request1)

      status(result1) must equalTo(200)

      await(result1.map{r =>

        r.header.headers must equalTo(
          Map("ETag" -> "db7fc6d463a3d66791868a233c1652b7", "Content-Type" -> "text/html; charset=utf-8", "Cache-Control" -> "public, max-age=0", "Content-Encoding" -> "gzip")
        )
      })

      val bytes = new ByteArrayInputStream(contentAsBytes(result1).toArray)
      val gis: GZIPInputStream  = new GZIPInputStream(bytes)
      val scanner = new java.util.Scanner(gis).useDelimiter("\\A")

      scanner.next() must equalTo("<p>This is a test</p><p>In French</p><h1>Uh uh</h1><img src=\"/resources/test.test\"/><img src=\"/resources/test.test1\"/>")

    }

    "get a html-template from cache in production" in {

      environment.mode returns  Mode.Prod

      val request1 = FakeRequest("GET","/")

      val messages = mock[Messages]
      val lang = Lang("de")
      messages.lang returns lang

      messagesApi.preferred(request1) returns messages
      messagesApi("test.test")(lang) returns "In German"
      messagesApi("test.test1")(lang) returns "Oh Yeah"

      val result1 = controller.get("test/resources/controllers/",Asset("template.html"))(request1)

      status(result1) must equalTo(200)

      cache.get("template_detemplate.html").isDefined must equalTo(true)

    }

    "return 304 NOT MODIFIED if the template has not been changed" in {

      environment.mode returns  Mode.Dev

      val request1 = FakeRequest("GET","/").withHeaders(Seq("If-None-Match" -> "f708426433cb7fc2ae2e12c9d4d07dc8"):_*)

      val messages = mock[Messages]
      val lang = Lang("de")
      messages.lang returns lang

      messagesApi.preferred(request1) returns messages
      messagesApi("test.test")(lang) returns "In German"
      messagesApi("test.test1")(lang) returns "Oh Yeah"

      val result1 = controller.get("test/resources/controllers/",Asset("template.html"))(request1)

      status(result1) must equalTo(304)

    }

    "create a javascript with all messages" in {

      val request1 = FakeRequest("GET","/messages/abc").withHeaders(Seq(("Referer","/home")):_*)

      val map = Map(
        "de" -> Map("test.test" -> "hallo","abc.test1" -> "gruss"),
        "fr" -> Map("test.test" -> "bonjour","abc.test1" -> "gruss")
      )

      val messages = mock[Messages]
      val lang = Lang("de","CH")
      messages.lang returns lang

      messagesApi.messages returns map

      messagesApi.preferred(request1) returns messages
      messagesApi("test.test")(lang) returns "In German"
      messagesApi("test.test1")(lang) returns "Oh Yeah"

      val result1 = controller.messages("test")(request1)

      status(result1) must equalTo(200)
      contentType(result1) must equalTo(Some("application/javascript"))
      new String(contentAsBytes(result1).toArray) must equalTo("var m={\"test.test\":\"hallo\"};")

      messages.lang returns Lang("fr","CH")
      new String(contentAsBytes(controller.messages("test")(request1)).toArray) must equalTo("var m={\"test.test\":\"bonjour\"};")

    }

    "change the language" in {

      val request1 = FakeRequest("GET","/language/set").withHeaders(Seq(("Referer","/home")):_*)
      val result1 = await(controller.setLanguage("de")(request1))

      success

    }
  }

}
