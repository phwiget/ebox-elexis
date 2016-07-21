package models.person.converters

import play.api.test.PlaySpecification

class ConverterSpec extends PlaySpecification with Samples{

  "Converter" should {

    "convert a XML to a human name" in {

      import Converters._
      humanNameConverter(xmlHumanName1).fullName must equalTo("Maria Meier")

    }

  }


}
