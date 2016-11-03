package models.patient

import models.fhir.XmlRepresentation
import models.person.{HumanName, Person}

case class Patient(
  id: String,
  identifier: Seq[String],
  name: HumanName,
  gender: String
) extends Person with XmlRepresentation {

  lazy val toXML = XmlWrites.patientWrites(this)

}
