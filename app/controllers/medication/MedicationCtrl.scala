package controllers.medication

import com.google.inject.{Inject, Singleton}
import controllers.Errors
import controllers.actions.Actions
import models.medication.{Formats, MedicationService}
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.{JsError, Json}
import play.api.mvc.Controller
import Formats.medicationOrderWrites
import models.medication.dal.MedicationDAO
import utils.JsonUtils._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class MedicationCtrl @Inject()(actions: Actions, mediationService: MedicationService, medicationDAO: MedicationDAO)(val messagesApi: MessagesApi) extends Controller with I18nSupport{

  import actions._

  def list(patientId: String, history: Boolean) = IsAuthenticated.async{implicit request =>

    mediationService.list(patientId, history).map(_.fold(
      e => BadRequest(Errors.toJson(e)),
      medicationOrders => Ok(Json.toJson(medicationOrders))
    ))

  }

  def detail(id: String) = IsAuthenticated.async{implicit request =>

    medicationDAO.detail(id).map(_.fold(
      e => BadRequest(Errors.toJson(e)),
      medicationOrders => Ok(Json.toJson(medicationOrders))
    ))

  }

  def save() = IsAuthenticated.async{implicit request =>

    import models.medication.Formats._
    request.body.asJson.get.validate(medicationOrderReads).fold(

      e => Future(BadRequest(e.toJson)),

      mo => mediationService.update(mo).map(_.fold(
        e => BadRequest(JsError(e).errors.toJson),
        r => Ok(Json.obj("id" -> r))
      ))

    )
  }

}
