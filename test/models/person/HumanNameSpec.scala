package models.person

import play.api.test.PlaySpecification

class HumanNameSpec extends PlaySpecification{

  "Human name " should {

    "return the fullname " in {

      HumanName("abc", "cd").fullName must equalTo("abc cd")

    }
  }

}
