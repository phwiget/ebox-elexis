package models.fhir.converters

trait Samples {

  val coding1 =
    <coding>
        <system value="urn:oid:2.16.840.1.113883.6.73"></system>
      <code value="A10BH01"></code>
    </coding>

  val coding2 =
    <coding>
      <code value="A10BH01"></code>
    </coding>

  val codeableConcept1 =
    <medicationCodeableConcept>
      <coding>
        <system value="urn:oid:2.16.840.1.113883.6.73‎"></system>
        <code value="A10BH01"></code>
      </coding>
      <text value="JANUVIA 100 mg Filmtabl"></text>
    </medicationCodeableConcept>

  val codeableConcept2 =
    <medicationCodeableConcept>
      <coding>
        <system value="urn:oid:2.16.840.1.113883.6.73‎"></system>
        <code value="A10BH01"></code>
      </coding>
      <coding>
        <system value="A"></system>
        <code value="B"></code>
      </coding>
      <text value="JANUVIA 100 mg Filmtabl"></text>
    </medicationCodeableConcept>

  val annotation1 =
    <note>
      <time value="2016-06-27T11:50:32+02:00"></time>
      <author value="John Doe"></author>
      <text value="Vor dem Essen"></text>
    </note>

  val event1 =
      <eventHistory>
        <status value="stopped"></status>
        <dateTime value="2016-07-27T11:51:36+02:00"></dateTime>
        <reason>
          <text value="Geändert durch Wiget Philipp"></text>
        </reason>
      </eventHistory>
}
