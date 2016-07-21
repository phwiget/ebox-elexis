package models.patient

import models.person.{HumanName, Person}

case class Patient(
  id: String,
  identifier: Seq[String],
  name: HumanName,
  gender: String
) extends Person
