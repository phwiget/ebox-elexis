package utils

/**
  * Override configurations needed for testing only (i.e. database connection)
  */
object TestConfig {

  def apply() = 	Map(
    "db.default.driver"             -> "com.mysql.jdbc.Driver"
    , "db.default.url"                -> "jdbc:mysql://localhost/springerboerse_test?zeroDateTimeBehavior=convertToNull"
    , "db.default.username"           -> "testrunner"
    , "db.default.password"           -> ""
    , "slick.dbs.default.driver"      -> "slick.driver.MySQLDriver$"
    ,	"slick.dbs.default.db.driver"   -> "com.mysql.jdbc.Driver"
    , "slick.dbs.default.db.url"      -> "jdbc:mysql://localhost/springerboerse_test?zeroDateTimeBehavior=convertToNull"
    , "slick.dbs.default.db.user"     -> "testrunner"
    , "slick.dbs.default.db.password" -> ""
  )

}
