package helpers

import play.api.libs.crypto.CSRFTokenSigner
import play.api.mvc.Cookie
import play.api.test.FakeHeaders

trait RequestHelpers extends SingleInstance {

  val session = Seq("username" -> "test1")
  val unauthorized = Seq("user" -> "nope")

  val fakeCSRFHeader =FakeHeaders(Seq("Csrf-Token" -> "0cf1f9703fc9b5f0e7ef59c493012fcb3c1d2e2b-1469171829785-4e098a4a60eb6cbf5d5dd128"))
  val fakeCSRFCookie = Cookie("XSRF-TOKEN","0cf1f9703fc9b5f0e7ef59c493012fcb3c1d2e2b-1469171829785-4e098a4a60eb6cbf5d5dd128")

  val basicAuthentication ="Authorization" -> "Basic dGVzdGVyM0B0ZXN0LmNvbTpNQ2tkOUtEb2UwMjAxMw=="

//  We need lazy instantiation as otherwise the application is not yet started
  lazy val signer = application.injector.instanceOf[CSRFTokenSigner]
  lazy val token = signer.generateSignedToken

  lazy val CSRFHeader = FakeHeaders(Seq("Csrf-Token" -> token))
  lazy val CSRFCookie = Cookie("XSRF-TOKEN",token)

}
