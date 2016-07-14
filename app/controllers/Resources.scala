package controllers

import com.google.inject.{Inject, Singleton}
import controllers.Assets.Asset
import play.api.cache.CacheApi
import play.api.i18n.{I18nSupport, Lang, MessagesApi}
import play.api.{Configuration, Environment, Mode}
import play.api.mvc.{Action, Controller}

@Singleton
class Resources @Inject()(
  env: Environment,
  configuration: Configuration)(val messagesApi: MessagesApi) extends Controller with I18nSupport {

  lazy val frontendPath = configuration.getString("play.frontend.path").getOrElse("frontend/")

  /**
    * Fetches resources in an optimized manner depending on the current environment:<br>
    * Dev: Resources are read from disk, hence the app don't need to reload<br>
    * Prod: Resources are read from the asset package as in a vanilla setup. Note that reverse routing works properly with regards to minification and fingerprinting due the specified type "Asset".
    *
    * @param path
    * @param file
    * @return
    */
  def get(path:String, file:Asset) = {

    if (env.mode == Mode.Dev)
      Action { implicit request =>

        val f = new java.io.File(frontendPath + file.name)

        if (f.exists()) Ok.sendFile(f)
        else BadRequest

      }

    else controllers.Assets.versioned("/public", file)
  }

  def dist(path: String, file: Asset) = get(path, file.copy(name = "dist/" + file.name))
  def jspm(path: String, file: Asset) = get(path, file.copy(name = "jspm_packages/" + file.name))

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
