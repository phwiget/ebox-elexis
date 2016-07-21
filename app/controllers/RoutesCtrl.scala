package controllers

import play.api.mvc.{Action, Controller}
import play.api.routing._

class RoutesCtrl extends Controller{

  def get(page: String) = Action { implicit request =>


    val r: Seq[JavaScriptReverseRoute] = page match{
      case "login" => Seq(
        controllers.authentication.routes.javascript.LoginCtrl.login,
        controllers.authentication.routes.javascript.LoginCtrl.index
      )
      case _ => Seq(
        controllers.patient.routes.javascript.PatientCtrl.list
      )
    }

    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        r: _*
      )
    ).as("text/javascript")
  }


}
