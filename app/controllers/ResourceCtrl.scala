package controllers

import javax.inject.Singleton

import com.google.inject.Inject
import play.api.mvc.{Action, Controller}

@Singleton
class ResourceCtrl @Inject() extends Controller {

  def index = Action(Ok("test"))

}
