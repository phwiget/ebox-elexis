package controllers

import com.google.inject.Singleton
import play.api.mvc.{Action, Controller}
import play.api.routing._

@Singleton
class RoutesCtrl extends Controller{

  def get(page: String) = Action { implicit request =>


    val r: Seq[JavaScriptReverseRoute] = page match{
      case "login" => Seq(
        controllers.login.routes.javascript.LoginCtrl.login,
        controllers.login.routes.javascript.LoginCtrl.index
      )
      case _ => Seq(
        controllers.patient.routes.javascript.PatientCtrl.list,
        controllers.patient.routes.javascript.PatientCtrl.detail,
        controllers.medication.routes.javascript.MedicationCtrl.list
      )
    }

    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        r: _*
      )
    ).as("text/javascript")
  }


}
