package controllers

import play.api.mvc.{Action, Controller}
import play.api.routing._

class RoutesCtrl extends Controller{

  def get(page: String) = Action { implicit request =>


    val r: Seq[JavaScriptReverseRoute] = page match{
      case "login" => Seq(routes.javascript.LoginCtrl.login)
      case _ => Seq.empty
    }

    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        r: _*
      )
    ).as("text/javascript")
  }


}
