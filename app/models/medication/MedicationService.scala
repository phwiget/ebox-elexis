package models.medication

import com.google.inject.Inject
import models.medication.dao.MedicationDAO
import models.request.UserRequest
import play.api.mvc.AnyContent

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

class MedicationService @Inject()(medicationDAO: MedicationDAO) {

  def list(patientId: String, history: Boolean = false)(implicit request: UserRequest[AnyContent]): Future[Either[String, scala.Seq[MedicationOrder]]] = {

    medicationDAO.list(patientId).map(_.right.map(
      orders  => if (history) orders else orders.filter(_.isHistory == false)
    ))

  }


}
