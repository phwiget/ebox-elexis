package models.medication.dal

import com.google.inject.Inject
import models.Endpoints
import models.medication.{XmlReads, MedicationOrder}
import models.request.UserRequest
import utils.WebService
import play.api.http.HttpVerbs._
import play.api.mvc.AnyContent

import scala.concurrent.Future

class MedicationDAO @Inject()(webService: WebService, endpoints: Endpoints) {

  import XmlReads._

  def list(patientId: String)(implicit request: UserRequest[AnyContent]): Future[Either[String, Seq[MedicationOrder]]] = {

    webService.request[Seq[MedicationOrder]](endpoints.Medication.list(patientId),GET)

  }

  def detail(id: String)(implicit request: UserRequest[AnyContent]): Future[Either[String, MedicationOrder]] = {

    webService.request[MedicationOrder](endpoints.Medication.detail(id),GET)

  }

  def update(medicationOrder: MedicationOrder)(implicit request: UserRequest[AnyContent]): Future[Either[String, String]] = {

    implicit val converter = models.fhir.formats.XmlReads.contentLocationReads
    webService.request[String](endpoints.Medication.update(medicationOrder), PUT, Some(medicationOrder))

  }

}
