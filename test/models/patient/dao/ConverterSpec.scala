package models.patient.dao

import Converters._
import play.api.test.PlaySpecification

class ConverterSpec extends PlaySpecification with Samples{

  "Converter" should {

    "convert to a patient" in {

      patientConverter(patient1).fullName must equalTo("Maria Meier")

    }

    "convert to patients" in {

      val patients = patientsConverter(patients1)
      patients.length must equalTo(2)
      patients.last.fullName must equalTo("Miroslav Jabui")

      patientsConverter(patientsEmpty).length must equalTo(0)

    }

  }


}