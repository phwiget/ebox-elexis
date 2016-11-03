package models.patient.dal

import com.google.inject.Inject
import models.Endpoints
import models.patient.{XmlReads, Patient}
import models.request.UserRequest
import play.api.http.HttpVerbs._
import play.api.mvc.AnyContent
import utils.WebService

import scala.concurrent.Future

class PatientDAO @Inject()(webService: WebService, endpoints: Endpoints) {

  import XmlReads._

  def list(search: String)(implicit request: UserRequest[AnyContent]): Future[Either[String,Seq[Patient]]] = {

    webService.request[Seq[Patient]](endpoints.Patient.list(search), GET)

  }

  def detail(number: Long)(implicit request: UserRequest[AnyContent]): Future[Either[String,Option[Patient]]] = {

    webService.request[Option[Patient]](endpoints.Patient.detail(number), GET)

  }

}
