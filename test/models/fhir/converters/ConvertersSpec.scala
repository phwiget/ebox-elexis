package models.fhir.converters

import Converters._

import org.specs2.mock.Mockito
import play.api.test.PlaySpecification

class ConvertersSpec extends PlaySpecification with Mockito with Samples{

  "Converters" should {

    "convert an XML to a Coding" in {


      val c1 = codingConverter(coding1)
      c1.system must equalTo(Some("urn:oid:2.16.840.1.113883.6.73"))
      c1.code must equalTo(Some("A10BH01"))

      val c2 = codingConverter(coding2)
      c2.system must equalTo(None)

    }

    "convert an XML to a CodeableConcept" in {


      val c1 = codeableConceptConverter(codeableConcept1)
      c1.codings.head.code must equalTo(Some("A10BH01"))
      c1.text.get must equalTo("JANUVIA 100 mg Filmtabl")

      val c2 = codeableConceptConverter(codeableConcept2)
      c2.codings.length must equalTo(2)

    }
  }

}
