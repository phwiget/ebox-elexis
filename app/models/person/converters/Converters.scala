package models.person.converters

import models.person.HumanName

import scala.xml.NodeSeq

object Converters {

  implicit val humanNameConverter = (xml: NodeSeq) =>

    HumanName(
      (xml \ "given" \ "@value").text,
      (xml \ "family" \ "@value").text
    )

}
