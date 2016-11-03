package models.fhir

import scala.xml.NodeSeq

trait XmlRepresentation {

  def toXML: NodeSeq

}
