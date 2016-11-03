package models.fhir.formats

import XmlReads._
import org.joda.time.DateTime
import org.specs2.mock.Mockito
import play.api.test.PlaySpecification

class XmlReadsSpec extends PlaySpecification with Mockito with Samples{

  "Xml reads" should {

    "convert an XML to a Content-Location" in {


      val c1 = contentLocationReads(contentLocation1)
      c1 must equalTo("http://localhost/resource")

    }

    "convert an XML to a Coding" in {


      val c1 = codingReads(coding1)
      c1.system must equalTo(Some("urn:oid:2.16.840.1.113883.6.73"))
      c1.code must equalTo(Some("A10BH01"))

      val c2 = codingReads(coding2)
      c2.system must equalTo(None)

    }

    "convert an XML to a CodeableConcept" in {


      val c1 = codeableConceptReads(codeableConcept1)
      c1.codings.head.code must equalTo(Some("A10BH01"))
      c1.text.get must equalTo("JANUVIA 100 mg Filmtabl")

      val c2 = codeableConceptReads(codeableConcept2)
      c2.codings.length must equalTo(2)

    }

    "convert an XML to an Annotation" in {

      val a1 = annotationReads(annotation1)
      a1.text must equalTo("Vor dem Essen")
      a1.author.get must equalTo("John Doe")
      a1.time.get must equalTo(new DateTime(2016,6,27,11,50,32))

    }


    "convert an XML to an Event" in {

      val e1 = eventHistoryReads(event1)
      e1.status must equalTo("stopped")
      e1.dateTime must equalTo(new DateTime(2016,7,27,11,51,36))
      e1.reason.get.text.get must equalTo("Geändert durch Wiget Philipp")

    }
  }

}
