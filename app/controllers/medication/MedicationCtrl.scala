package controllers.medication

import com.google.inject.{Inject, Singleton}
import controllers.Errors
import controllers.actions.Actions
import models.medication.MedicationService
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.Controller
import models.medication.dao.Formats.medicationOrderWrites

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class MedicationCtrl @Inject()(actions: Actions, mediationService: MedicationService)(val messagesApi: MessagesApi) extends Controller with I18nSupport{

  import actions._

  def list(patientId: String, history: Boolean) = IsAuthenticated.async{implicit request =>

    mediationService.list(patientId, history).map(_.fold(
      e => BadRequest(Errors.toJson(e)),
      medicationOrders => Ok(Json.toJson(medicationOrders))
    ))

  }

}
