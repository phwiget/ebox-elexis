package models.patient.dao

import Converters._
import play.api.test.PlaySpecification

class ConverterSpec extends PlaySpecification with Samples{

  "Converter" should {

    "convert to a patient" in {

      val p = patientConverter(patient1)
      p.fullName must equalTo("Maria Meier")
      p.id must equalTo("if69a4f3141137d308")
      p.gender must equalTo("female")

    }

    "convert to an optional patient" in {

      mayBePatientConverter(patientsEmpty).isEmpty must equalTo(true)

    }


    "convert to patients" in {

      val patients = patientsConverter(patients1)
      patients.length must equalTo(2)
      patients.last.fullName must equalTo("Miroslav Jabui")

      patientsConverter(patientsEmpty).length must equalTo(0)

    }

  }


}