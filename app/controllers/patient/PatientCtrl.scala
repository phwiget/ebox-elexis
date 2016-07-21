package controllers.patient

import com.google.inject.Inject
import controllers.actions.Actions
import models.patient.dao.PatientDAO
import play.api.libs.json.Json
import play.api.mvc.Controller
import Formats._
import scala.concurrent.ExecutionContext.Implicits.global

class PatientCtrl @Inject()(actions: Actions, patientDAO: PatientDAO) extends Controller{

  import actions._

  def list(search: String) = IsAuthenticated.async{implicit request =>

    patientDAO.list(search).map(patients => Ok(Json.toJson(patients)))

  }

}
