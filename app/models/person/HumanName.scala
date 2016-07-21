package models.person

case class HumanName(
  given: String,
  family: String
) {
  lazy val fullName = given + " " + family
}
