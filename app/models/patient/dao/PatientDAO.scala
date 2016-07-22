package models.patient.dao

import com.google.inject.Inject
import models.Endpoints
import models.patient.Patient
import play.api.http.HttpVerbs._
import utils.WebService

import scala.concurrent.Future

class PatientDAO @Inject()(webService: WebService, endpoints: Endpoints) {

  import Converters._

  def list(search: String): Future[Either[String,Seq[Patient]]] = {

    webService.request[Seq[Patient]](endpoints.Patient.list(search), GET)

  }

  def detail(number: Long): Future[Either[String,Option[Patient]]] = {

    webService.request[Option[Patient]](endpoints.Patient.detail(number), GET)

  }

}
