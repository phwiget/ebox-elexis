package helpers

/**
  * Override configurations needed for testing only (i.e. database connection)
  */
object TestConfig {

  def apply() = 	Map(
    "test.config" -> "abc"
  )

}
