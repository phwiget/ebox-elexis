package helpers

import play.api.mvc.Cookie
import play.api.test.FakeHeaders

trait RequestHelpers {

  val session = Seq("username" -> "test1")
  val unauthorized = Seq("user" -> "nope")

  val fakeCSRFHeader =FakeHeaders(Seq("Csrf-Token" -> "0cf1f9703fc9b5f0e7ef59c493012fcb3c1d2e2b-1469171829785-4e098a4a60eb6cbf5d5dd128"))
  val fakeCSRFCookie = Cookie("XSRF-TOKEN","0cf1f9703fc9b5f0e7ef59c493012fcb3c1d2e2b-1469171829785-4e098a4a60eb6cbf5d5dd128")
  val basicAuthentication ="Authorization" -> "Basic dGVzdGVyM0B0ZXN0LmNvbTpNQ2tkOUtEb2UwMjAxMw=="

}
