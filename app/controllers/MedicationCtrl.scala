package controllers

import com.google.inject.{Inject, Singleton}
import play.api.libs.ws.WSClient
import play.api.mvc.{Action, Controller}

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class MedicationCtrl @Inject()(wsClient: WSClient)(implicit executionContext: ExecutionContext) extends Controller{

  def detail(id: String) = Action.async{implicit request =>

    Future(Ok)
  }

}
