package models.patient.dao

import models.patient.Patient

import scala.xml.NodeSeq
import models.person.converters.Converters._

object Converters {

  implicit val patientConverter = (xml: NodeSeq) => {

      Patient(
        (xml \ "id " \ "@value").text,
        (xml \\ "identifier").map(i => (i \ "value" \ "@value").text),
          xml \ "name",
        (xml \ "gender" \ "@value").text
      )

  }

  implicit val patientsConverter = (xml: NodeSeq) => {

    (xml \\ "Patient").map(patientConverter)

  }

}
