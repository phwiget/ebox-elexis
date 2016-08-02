package controllers

import java.io.{BufferedReader, InputStream, InputStreamReader}
import java.nio.charset.StandardCharsets
import java.nio.file.{Files, Paths}
import java.security.MessageDigest
import java.util.zip.GZIPOutputStream

import akka.util.ByteString
import com.google.inject.{Inject, Singleton}
import controllers.Assets.Asset
import play.api.cache.CacheApi
import play.api.http.HttpEntity
import play.api.i18n.{I18nSupport, Lang, Messages, MessagesApi}
import play.api.{Configuration, Environment, Mode}
import play.api.mvc.{ResponseHeader, _}

@Singleton
class Resources @Inject()(
  env: Environment,
  configuration: Configuration,
  cacheApi: CacheApi)(val messagesApi: MessagesApi) extends Controller with I18nSupport {

  lazy val frontendPath = configuration.getString("play.frontend.path").getOrElse("frontend/")

  lazy val messageDigest = MessageDigest.getInstance("MD5")
  lazy val md5 = (bytes: Array[Byte]) => messageDigest.digest(bytes).map("%02X".format(_)).mkString.toLowerCase

  /**
    * Fetches resources in an optimized manner depending on the current environment:<br>
    * Dev: Resources are read from disk, hence the app don't need to reload<br>
    * Prod: Resources are read from the asset package as in a vanilla setup. Note that reverse routing works properly with regards to minification, fingerprinting and Caching due to the specified type "Asset".
    *
    * @param path
    * @param file
    * @return
    */
  def get(path:String, file:Asset): Action[AnyContent] = {

    if (file.name.endsWith(".html")) serveTemplate(file)
    else serveAsset(file)

  }

  def dist(path: String, file: Asset) = get(path, file.copy(name = "dist/" + file.name))
  def jspm(path: String, file: Asset) = get(path, file.copy(name = "jspm_packages/" + file.name))
  def custom(path: String, file: Asset) = get(path, file.copy(name = "custom/" + file.name))

  private def serveAsset(file:Asset): Action[AnyContent] = {

    if (env.mode == Mode.Dev)
      Action { implicit request =>

        val f = new java.io.File(frontendPath + file.name)

        if (f.exists()) Ok.sendFile(f)
        else BadRequest

      }

    else controllers.Assets.versioned("/public", file)

  }

  val reverseRouter = (resource: String) => routes.Resources.get(Asset(resource)).url

  private def serveTemplate(file: Asset): Action[AnyContent] = {

    Action{implicit request =>

      val lang = messagesApi.preferred(request).lang.language match{
        case "de" => "de"
        case "fr" => "fr"
        case _ => "de"
      }

      getTemplate(lang, file) match{case(etag, gzip) =>

        if (etag == request.headers.get("If-None-Match").getOrElse("")) NotModified
        else {

          val headers: Map[String,String]= Map(CACHE_CONTROL->"public, max-age=0",CONTENT_TYPE -> "text/html; charset=utf-8",CONTENT_ENCODING -> "gzip", ETAG->etag )
          val entity: HttpEntity = HttpEntity.Strict(ByteString.fromArray(gzip),None)

          Result(
            header = ResponseHeader(OK, headers),
            body = entity
          )

        }

      }

    }

  }


  private def getTemplate(lang: String, file: Asset): (String,Array[Byte]) = {

    lazy val template = gzip(createTemplate(file.name,lang,reverseRouter))
    lazy val etag = md5(template)

    if (env.mode == Mode.Dev) (etag, template)
    else cacheApi.getOrElse[(String,Array[Byte])]("template_" + lang + file.name ){(etag,template)}

  }

  private def gzip(template: String): Array[Byte] = {

    val out = new java.io.ByteArrayOutputStream(template.length)

    val gzip: GZIPOutputStream = new GZIPOutputStream(out)
    gzip.write(template.getBytes(StandardCharsets.UTF_8))
    gzip.close()

    val bytes = out.toByteArray

    out.close()

    bytes
  }

  def createTemplate(template:String,lang:String,reverseRouter:String => String): String = {

    implicit val language = Messages(Lang(lang), messagesApi)

    val templateString =
        if (env.mode == Mode.Dev) new String(Files.readAllBytes(Paths.get(frontendPath + template)),StandardCharsets.UTF_8)
        else inputStreamToString(env.resourceAsStream("public/" + template).get)

    lazy val pattern = "(?<=@Messages\\(\')(.*?)(?=\'\\))".r
    lazy val part1 = """@Messages('"""
    lazy val part2 = """')"""

    lazy val patternResources = "(?<=@Resources\\(\')(.*?)(?=\'\\))".r
    lazy val part1Resources = """@Resources('"""

    val withMessages =
      pattern.findAllIn(templateString).map(m => (part1 + m + part2,
        Messages(m)(language))
      ).foldLeft(templateString)((template, message) => template.replace(message._1, message._2))


    patternResources.findAllIn(
      withMessages
    ).map(r => (part1Resources + r + part2, reverseRouter(r))).foldLeft(withMessages)((template, resource) => template.replace(resource._1, resource._2))


  }

  private def inputStreamToString(is: InputStream) = {
    val inputStreamReader = new InputStreamReader(is,StandardCharsets.UTF_8)
    val bufferedReader = new BufferedReader(inputStreamReader)
    Iterator continually bufferedReader.readLine takeWhile (_ != null) mkString
  }
  /**
    * Generates and provides a javascript with all translation for the implicit Language and the specified locator. This is a helper method to assist i18n with Angular2 templates. <br>
    *   Example: messages("home") fetches all keys starting with "home", e.g. "home.title", "home.header".<br><br>
    *     By convention, messages can be accessed in the namespace "m".
    *
    * @param locator Locator to the relevant strings
    * @return
    */
  def messages(locator:String) = Action{implicit request =>

    val json = messagesApi.messages.get(messagesApi.preferred(request).lang.language).filter(_.nonEmpty).getOrElse(messagesApi.messages.get("default").get)
      .filter{case(k,v) => k.startsWith(locator)}.map{case(k,v) => "\"" + k + "\":\"" + v + "\"" }.mkString(",")

    Ok{
      "var m={" + json + "};"
    }.as("application/javascript;charset=utf-8")

  }

  /**
    * Utility function to set the language of the web-app.
    *
    * @param lang Language in focus
    * @return
    */
  def setLanguage(lang:String) = Action{implicit request =>

    Redirect(request.headers.get(REFERER).getOrElse("/")).withLang(Lang(lang))

  }

}
