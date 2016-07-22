package controllers.medication

import com.google.inject.{Inject, Singleton}
import controllers.Errors
import controllers.actions.Actions
import models.medication.dao.MedicationDAO
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.Controller
import models.medication.dao.Formats._
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class MedicationCtrl @Inject()(actions: Actions, medicationDAO: MedicationDAO)(val messagesApi: MessagesApi) extends Controller with I18nSupport{

  import actions._

  def list(patientId: String) = IsAuthenticated.async{implicit request =>

    medicationDAO.list(patientId).map(_.fold(
      e => BadRequest(Errors.toJson(e)),
      medicationOrders => Ok(Json.toJson(medicationOrders))
    ))

  }

}
