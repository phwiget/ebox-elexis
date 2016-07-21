package models.patient.dao

import com.google.inject.Inject
import models.Endpoints
import models.patient.Patient
import play.api.libs.ws.WSClient
import play.api.http._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

class PatientDAO @Inject()(wSClient: WSClient, endpoints: Endpoints) {

  import Converters._

  def list(search: String): Future[Either[String,Seq[Patient]]] = {

      wSClient.url(endpoints.Patient.list(search)).get.map(r =>

        r.status match{
          case Status.OK => Right(r.xml: Seq[Patient])
          case _ => Left("error.server.status." + r.status.toString)
        }

      ) recover {case t: Throwable => Left("error.server.unavailable")}

  }

}
