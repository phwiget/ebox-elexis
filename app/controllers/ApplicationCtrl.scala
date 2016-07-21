package controllers

import javax.inject._

import controllers.actions.Actions
import play.api.mvc._


@Singleton
class ApplicationCtrl @Inject()(actions: Actions) extends Controller {

  import actions._

  /**
   * Main entry point for the application. Note that only authenticated users are allowed.
   */
  def index = IsAuthenticated {implicit request =>

    Ok(views.html.index())

  }

}
