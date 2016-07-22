package models.medication.dao

import com.google.inject.Inject
import models.Endpoints
import models.medication.MedicationOrder
import utils.WebService
import play.api.http.HttpVerbs._

import scala.concurrent.Future

class MedicationDAO @Inject()(webService: WebService, endpoints: Endpoints) {

  import Converters._

  def list(patientId: String): Future[scala.Either[String, scala.Seq[MedicationOrder]]] = {

    webService.request[Seq[MedicationOrder]](endpoints.Medication.list(patientId),GET)

  }




}
