package models


import play.api.mvc.QueryStringBindable
import play.core.routing._


class Endpoints {

  /**
    * Construct a correctly encoded url-query with parameters<br>
    * The snippet is taken from the Play! source code
    * @param parameters
    * @return
    */
  def query(parameters: Map[String,String]): String =  queryString(
    parameters.map{case(key, value) => Some(implicitly[QueryStringBindable[String]].unbind(key, value))}.toList
  )

  def query(key: String, value: String): String = query(Map(key -> value))

  val BaseUrl ="http://localhost:8380/fhir"

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

  }

}
