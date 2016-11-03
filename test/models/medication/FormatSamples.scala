package models.medication

import play.api.libs.json.Json

trait FormatSamples {

  val order1 = Json.obj(
    "showFreetext"->false,
    "hasBeenStopped"->false,
    "id"->"57b2133597ec42dda3670495",
    "status"->"active",
    "dateWritten"->1478107636000L,
    "article"->"DUL-X Gel Neck Relax 50 ml",
    "instructions"->"3-0-1-0",
    "posology"-> Json.obj("morning"->3,"midday"->0,"evening"->1,"night"->0),
    "hasPosology"->true,
    "endDate"->1478156772138L,
    "notes"->"Test",
    "additionalInstructions"->"Test2"
  )

  val order2 = order1 ++ Json.obj("isReserve" -> true)
  
  val order3 = order1 ++ Json.obj("dateEnded"->1478157552262L,"reasonEnded"->"Test","incompatibility"->"Unverträglichkeit")

  val error1 = order1 ++ Json.obj("dateEnded" ->1468157552262L )
  val error2 = Json.obj()
}
