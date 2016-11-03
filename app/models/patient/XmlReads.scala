package models.patient

import models.person.converters.Converters._

import scala.xml.NodeSeq

object XmlReads {

  implicit val patientReads = (xml: NodeSeq) => {

      Patient(
        (xml \ "id" \ "@value").text,
        (xml \\ "identifier").map(i => (i \ "value" \ "@value").text),
          xml \ "name",
        (xml \ "gender" \ "@value").text
      )

  }

  implicit val mayBePatientReads = (xml: NodeSeq) => {

    (xml \ "Patient").headOption.map(patientReads)


  }

  implicit val patientsReads = (xml: NodeSeq) => {

    (xml \\ "Patient").map(patientReads)

  }



}
