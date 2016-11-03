package models.fhir.formats

import models.fhir.{Annotation, CodeableConcept, Coding, Event}
import org.joda.time.DateTime
import org.specs2.mock.Mockito
import play.api.test.PlaySpecification

class XmlWritesSpec extends PlaySpecification with Mockito{

  "Xml writes" should {

    "write an annotation to xml" in {

      val a = XmlWrites.writeAnnotation(Annotation(None, None, "hello"))
      val b = XmlWrites.writeAnnotation(Annotation(Some("Test"), None, "hello"))
      val c = XmlWrites.writeAnnotation(Annotation(Some("Test"), Some(new DateTime(2016,1,1,0,1,0)), "hello"))

      a.toString must equalTo("<text value=\"hello\"></text>")
      b.toString must equalTo("<author value=\"Test\"></author><text value=\"hello\"></text>")
      c.toString must equalTo("<time value=\"2016-01-01T00:01:00+01:00\"></time><author value=\"Test\"></author><text value=\"hello\"></text>")
    }

    "write a coding to xml" in {

      val a = Coding(None, None)
      val b = Coding(Some("system"), None)
      val c = Coding(Some("system"), Some("code"))

      XmlWrites.writeCoding(a).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<coding><system></system><code></code></coding>")
      XmlWrites.writeCoding(b).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<coding><system value=\"system\"></system><code></code></coding>")
      XmlWrites.writeCoding(c).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<coding><system value=\"system\"></system><code value=\"code\"></code></coding>")

    }

    "write a codeable concept to xml" in {

      val b = Coding(Some("system"), None)
      val c = Coding(Some("system"), Some("code"))

      val d = CodeableConcept(Seq.empty, None)
      val e = CodeableConcept(Seq.empty, Some("Test"))
      val f = CodeableConcept(Seq(b), Some("Test"))
      val g = CodeableConcept(Seq(b,c), Some("Test"))

      XmlWrites.writeCodeableConcept(d).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<text></text>")
      XmlWrites.writeCodeableConcept(e).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<text value=\"Test\"></text>")
      XmlWrites.writeCodeableConcept(f).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<coding><system value=\"system\"></system><code></code></coding><text value=\"Test\"></text>")
      XmlWrites.writeCodeableConcept(g).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<coding><system value=\"system\"></system><code></code></coding><coding><system value=\"system\"></system><code value=\"code\"></code></coding><text value=\"Test\"></text>")

    }

    "write an event to xml" in {


      val a = CodeableConcept(Seq.empty, Some("Some reason"))
      val b = Event("active", new DateTime(2015,2,3,1,2,3), None, None)
      val c = Event("active", new DateTime(2015,2,3,1,2,3), None, Some(a))

      XmlWrites.writeEvent(b).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<eventHistory><status value=\"active\"></status><dateTime value=\"2015-02-03T01:02:03+01:00\"></dateTime></eventHistory>")
      XmlWrites.writeEvent(c).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<eventHistory><status value=\"active\"></status><dateTime value=\"2015-02-03T01:02:03+01:00\"></dateTime><reason><text value=\"Some reason\"></text></reason></eventHistory>")

    }

  }

}
