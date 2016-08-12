package controllers.patient

import com.google.inject.{Inject, Singleton}
import controllers.actions.Actions
import models.patient.dal.PatientDAO
import play.api.libs.json.Json
import play.api.mvc.Controller
import controllers.Errors
import models.patient.Formats
import play.api.i18n.{I18nSupport, MessagesApi}

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class PatientCtrl @Inject()(actions: Actions, patientDAO: PatientDAO)(val messagesApi: MessagesApi) extends Controller with I18nSupport{

  import actions._
  import Formats._

  def list(search: String) = IsAuthenticated.async{implicit request =>

    patientDAO.list(search).map(_.fold(
      e => BadRequest(Errors.toJson(e)),
      patients => Ok(Json.toJson(patients))
    ))

  }

  def detail(number: Long) = IsAuthenticated.async{ implicit request =>

    patientDAO.detail(number).map(_.fold(
      e => BadRequest(Errors.toJson(e)),
      patients => Ok(Json.toJson(patients))
    ))

  }
}
