package models.person

trait Person {

  val name: HumanName
  val gender: String

  lazy val fullName = name.fullName
}
