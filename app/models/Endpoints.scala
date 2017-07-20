package models


import com.google.inject.Inject
import models.medication.MedicationOrder
import play.api.Configuration
import play.api.mvc.QueryStringBindable
import play.core.routing._


class Endpoints @Inject()(configuration: Configuration) {

  private lazy val port = configuration.getString("application.elexis.server.port").getOrElse("8380")
  private lazy val url  = configuration.getString("application.elexis.server.baseUrl").getOrElse("http://localhost")
  lazy val BaseUrl =s"$url:$port/fhir"

  /**
    * Construct a correctly encoded url-query with parameters<br>
    * The snippet is taken from the Play! source code
    * @param parameters Url parameters as Map[String,String]
    * @return
    */
  def query(parameters: Map[String,String]): String =  queryString(
    parameters.map{case(key, value) => Some(implicitly[QueryStringBindable[String]].unbind(key, value))}.toList
  )

  def query(key: String, value: String): String = query(Map(key -> value))

  object Authentication{
    val login = BaseUrl + "/login"
  }

  object Patient{
    val list = (p: String) => BaseUrl + "/Patient" +  query("name",p)
    val detail = (number: Long) => BaseUrl + "/Patient" +  query("patientNumber",number.toString)

  }

  object Medication{

    val list = (patientId: String) => BaseUrl + "/MedicationOrder" +  query("patient",patientId)
    val detail = (id: String) => BaseUrl + "/MedicationOrder/" +  id
    val update = (medicationOrder: MedicationOrder) => detail(medicationOrder.id)

  }

}
