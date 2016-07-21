package controllers.patient

import com.google.inject.Inject
import controllers.actions.Actions
import models.patient.dao.PatientDAO
import play.api.libs.json.Json
import play.api.mvc.Controller
import Formats._
import controllers.Errors
import play.api.i18n.{I18nSupport, Messages, MessagesApi}

import scala.concurrent.ExecutionContext.Implicits.global

class PatientCtrl @Inject()(actions: Actions, patientDAO: PatientDAO)(val messagesApi: MessagesApi) extends Controller with I18nSupport{

  import actions._

  def list(search: String) = IsAuthenticated.async{implicit request =>

    patientDAO.list(search).map(_.fold(
      e => BadRequest(Errors.toJson(e)),
      patients => Ok(Json.toJson(patients))
    ))

  }

}
