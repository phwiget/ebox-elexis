package models.medication

import org.specs2.mock.Mockito
import play.api.test.PlaySpecification

class XmlWritesSpecs extends PlaySpecification with Mockito with SampleMedicationOrders{

  "Xml writes" should {

    "write a medication order as xml" in {

      XmlWrites.write(order1).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<MedicationOrder xmlns=\"http://hl7.org/fhir\"><id value=\"id\"></id><extension url=\"www.elexis.info/extensions/prescription/entrytype\"><valueCode value=\"UNKNOWN\"></valueCode></extension><text><div xmlns=\"http://www.w3.org/1999/xhtml\">Medication 1</div></text><patient id=\"abc\"></patient><dosageInstruction><text value=\"1-0-1-0\"></text><additionalInstructions><text value=\"Addition\"></text></additionalInstructions></dosageInstruction><medicationCodeableConcept><coding><system value=\"urn:oid:1.3.160\"></system><code value=\"GTIN\"></code></coding><text value=\"Medication 1\"></text></medicationCodeableConcept><eventHistory><status value=\"active\"></status><dateTime value=\"2015-02-03T00:00:00+01:00\"></dateTime></eventHistory></MedicationOrder>")
      XmlWrites.write(order2).toString.split('\n').map(_.trim.filter(_ >= ' ')).mkString.replace("\n","") must equalTo("<MedicationOrder xmlns=\"http://hl7.org/fhir\"><id value=\"id\"></id><identifier><system value=\"www.elexis.info/objid\"></system><value value=\"id\"></value></identifier><extension url=\"www.elexis.info/extensions/prescription/entrytype\"><valueCode value=\"UNKNOWN\"></valueCode></extension><text><div xmlns=\"http://www.w3.org/1999/xhtml\">Medication 1</div></text><status value=\"active\"></status><patient id=\"abc\"></patient><note><text value=\"Before bed\"></text></note><medicationCodeableConcept><coding><system value=\"urn:oid:1.3.160\"></system><code value=\"GTIN\"></code></coding><text value=\"Medication 1\"></text></medicationCodeableConcept></MedicationOrder>")


    }

  }

}
