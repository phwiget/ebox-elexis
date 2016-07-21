package models.user

trait User{
  val id: String
  val name: String
  val roles: Seq[String]
  val permissions: Seq[String]
}
