package models.fhir.formats

import models.fhir.{Annotation, CodeableConcept, Coding, Event}
import org.joda.time.format.ISODateTimeFormat

import scala.xml.{Elem, Node, NodeSeq}

object XmlWrites {

  def writeAnnotation(annotation: Annotation): NodeSeq = NodeSeq.fromSeq(Seq(
    annotation.time.map(d => <time value={d.toString(ISODateTimeFormat.dateTimeNoMillis())}></time>).orNull,
    annotation.author.map(a => <author value={a}></author>).orNull,
    <text value={annotation.text}></text>
  ).filter(_!= null))

  def writeCodeableConcept(codeableConcept: CodeableConcept): NodeSeq = NodeSeq.fromSeq(

    codeableConcept.codings.map(writeCoding) ++ Seq(<text value={codeableConcept.text.orNull}></text>)

  )

  def writeCoding(coding:Coding) = {
    <coding>
      <system value={coding.system.orNull}></system>
      <code value={coding.code.orNull}></code>
    </coding>
  }

  def writeEvent(event:Event) = {
    <eventHistory>
      <status value={event.status}></status>
      <dateTime value={event.dateTime.toString(ISODateTimeFormat.dateTimeNoMillis())}></dateTime>
      {event.reason.map(r => <reason>{writeCodeableConcept(r)}</reason>).orNull}
    </eventHistory>
  }

}
