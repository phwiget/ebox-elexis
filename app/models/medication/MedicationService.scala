package models.medication

import java.net.URI

import com.google.inject.Inject
import models.medication.dal.MedicationDAO
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

  def update(medicationOrder: MedicationOrder)(implicit request: UserRequest[AnyContent]) = {

    medicationDAO.detail(medicationOrder.id).flatMap(_.fold(
      e => Future(Left(e)),
      mo => medicationDAO.update(mo.update(medicationOrder)).map(_.right.map{s =>
        val path = new URI(s).getPath
        path.substring(path.lastIndexOf('/') + 1)
      })
    ))

  }

}
