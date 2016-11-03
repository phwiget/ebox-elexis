package models.patient

import play.api.test.PlaySpecification
import XmlReads._

class ConverterSpec extends PlaySpecification with Samples{

  "Converter" should {

    "convert to a patient" in {

      val p = patientReads(patient1)
      p.fullName must equalTo("Maria Meier")
      p.id must equalTo("if69a4f3141137d308")
      p.gender must equalTo("female")

    }

    "convert to an optional patient" in {

      mayBePatientReads(patientsEmpty).isEmpty must equalTo(true)

    }


    "convert to patients" in {

      val patients = patientsReads(patients1)
      patients.length must equalTo(2)
      patients.last.fullName must equalTo("Miroslav Jabui")

      patientsReads(patientsEmpty).length must equalTo(0)

    }

  }


}