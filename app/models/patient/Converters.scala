package models.patient

import models.person.converters.Converters._

import scala.xml.NodeSeq

object Converters {

  implicit val patientConverter = (xml: NodeSeq) => {

      Patient(
        (xml \ "id" \ "@value").text,
        (xml \\ "identifier").map(i => (i \ "value" \ "@value").text),
          xml \ "name",
        (xml \ "gender" \ "@value").text
      )

  }

  implicit val mayBePatientConverter = (xml: NodeSeq) => {

    (xml \ "Patient").headOption.map(patientConverter)


  }

  implicit val patientsConverter = (xml: NodeSeq) => {

    (xml \\ "Patient").map(patientConverter)

  }

}
