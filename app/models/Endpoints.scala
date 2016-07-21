package models


import play.api.mvc.QueryStringBindable
import play.core.routing._


class Endpoints {

  def query(parameters: Map[String,String]) =  queryString(
    parameters.map{case(key, value) => Some(implicitly[QueryStringBindable[String]].unbind(key, value))}.toList
  )
  def query(key: String, value: String) = queryString(List(Some(implicitly[QueryStringBindable[String]].unbind(key, value))))

  val BaseUrl ="http://localhost:8380/fhir"

  object Authentication{
    val login = BaseUrl + "/login"
  }

  object Patient{
    val list = (p: String) => BaseUrl + "/Patient" +  query("name",p)
  }

}
