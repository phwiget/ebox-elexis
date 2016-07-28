package models.medication.dao

trait Samples {

  val dosageInstruction1 =
    <dosageInstruction>
      <text value="1-1-0-1"></text>
    </dosageInstruction>

  val dosageInstruction2 =
    <dosageInstruction>
      <text value="1-1-0-1"></text>
      <additionalInstructions>
        <text value="Only if not on beta-Lactam"></text>
      </additionalInstructions>
    </dosageInstruction>

  val order1 =
    <MedicationOrder xmlns="http://hl7.org/fhir">
      <id value="Ff60020d714950f83034"></id>
      <text>
        <div xmlns="http://www.w3.org/1999/xhtml">JANUVIA 100 mg Filmtabl, 1-1-0-1, Morgens-Mittags-Vor schlafengehen</div>
      </text>
      <identifier>
        <system value="www.elexis.info/objid"></system>
        <value value="Ff60020d714950f83034"></value>
      </identifier>
      <status value="completed"></status>
      <medicationCodeableConcept>
        <coding>
          <system value="urn:oid:2.16.840.1.113883.6.73‎"></system>
          <code value="A10BH01"></code>
        </coding>
        <text value="JANUVIA 100 mg Filmtabl"></text>
      </medicationCodeableConcept>
      <dosageInstruction>
        <text value="1-1-0-1"></text>
      </dosageInstruction>
      <eventHistory>
        <status value="active"></status>
        <dateTime value="2016-07-27T11:51:36+02:00"></dateTime>
      </eventHistory>
      <eventHistory>
        <status value="stopped"></status>
        <dateTime value="2016-07-28T11:51:36+02:00"></dateTime>
        <reason>
          <text value="Geändert durch Wiget Philipp"></text>
        </reason>
      </eventHistory>
    </MedicationOrder>

  val orders1 =
    <Bundle xmlns="http://hl7.org/fhir">
      <id value="cc2d3ec0-01c2-4a7b-b511-74c0dd76be73"></id>
      <meta>
        <lastUpdated value="2016-07-22T09:56:33.223+02:00"></lastUpdated>
      </meta>
      <type value="searchset"></type>
      <total value="4"></total>
      <link>
        <relation value="self"></relation>
        <url value="http://localhost:8380/fhir/MedicationOrder?patient=qfbffca40d16e1382050"></url>
      </link>
      <entry>
        <fullUrl value="http://localhost:8380/fhir/MedicationOrder/Ff60020d714950f83034"></fullUrl>
        <resource>
          <MedicationOrder xmlns="http://hl7.org/fhir">
            <id value="Ff60020d714950f83034"></id>
            <text>
              <div xmlns="http://www.w3.org/1999/xhtml">JANUVIA 100 mg Filmtabl, 1-1-0-1, Morgens-Mittags-Vor schlafengehen</div>
            </text>
            <identifier>
              <system value="www.elexis.info/objid"></system>
              <value value="Ff60020d714950f83034"></value>
            </identifier>
            <dateWritten value="2016-07-22T09:54:35+02:00"></dateWritten>
            <note>
              <text value="Vor dem Essen"></text>
            </note>
            <medicationCodeableConcept>
              <coding>
                <system value="urn:oid:2.16.840.1.113883.6.73‎"></system>
                <code value="A10BH01"></code>
              </coding>
              <text value="JANUVIA 100 mg Filmtabl"></text>
            </medicationCodeableConcept>
            <dosageInstruction>
              <text value="1-1-0-1"></text>
            </dosageInstruction>
          </MedicationOrder>
        </resource>
      </entry>
      <entry>
        <fullUrl value="http://localhost:8380/fhir/MedicationOrder/Pa71f325a7b5ce9f5049"></fullUrl>
        <resource>
          <MedicationOrder xmlns="http://hl7.org/fhir">
            <id value="Pa71f325a7b5ce9f5049"></id>
            <text>
              <div xmlns="http://www.w3.org/1999/xhtml">DICLAC sandoz lipogel 1 % Gel</div>
            </text>
            <identifier>
              <system value="www.elexis.info/objid"></system>
              <value value="Pa71f325a7b5ce9f5049"></value>
            </identifier>
            <dateWritten value="2016-06-29T16:54:47+02:00"></dateWritten>
            <medicationCodeableConcept>
              <coding>
                <system value="urn:oid:2.16.840.1.113883.6.73‎"></system>
                <code value="M02AA15"></code>
              </coding>
              <text value="DICLAC sandoz lipogel 1 % Gel"></text>
            </medicationCodeableConcept>
          </MedicationOrder>
        </resource>
      </entry>
      <entry>
        <fullUrl value="http://localhost:8380/fhir/MedicationOrder/Red43387a2d007896033"></fullUrl>
        <resource>
          <MedicationOrder xmlns="http://hl7.org/fhir">
            <id value="Red43387a2d007896033"></id>
            <text>
              <div xmlns="http://www.w3.org/1999/xhtml">DICLAC sandoz lipogel 1 % Gel</div>
            </text>
            <identifier>
              <system value="www.elexis.info/objid"></system>
              <value value="Red43387a2d007896033"></value>
            </identifier>
            <dateWritten value="2016-06-29T16:48:39+02:00"></dateWritten>
            <dateEnded value="2016-06-29T16:48:39+02:00"></dateEnded>
            <medicationCodeableConcept>
              <coding>
                <system value="urn:oid:2.16.840.1.113883.6.73‎"></system>
                <code value="M02AA15"></code>
              </coding>
              <text value="DICLAC sandoz lipogel 1 % Gel"></text>
            </medicationCodeableConcept>
          </MedicationOrder>
        </resource>
      </entry>
      <entry>
        <fullUrl value="http://localhost:8380/fhir/MedicationOrder/zc5ed2f4c08271113055"></fullUrl>
        <resource>
          <MedicationOrder xmlns="http://hl7.org/fhir">
            <id value="zc5ed2f4c08271113055"></id>
            <text>
              <div xmlns="http://www.w3.org/1999/xhtml">DICLAC sandoz lipogel 1 % Gel</div>
            </text>
            <identifier>
              <system value="www.elexis.info/objid"></system>
              <value value="zc5ed2f4c08271113055"></value>
            </identifier>
            <dateWritten value="2016-06-29T16:54:51+02:00"></dateWritten>
            <medicationCodeableConcept>
              <coding>
                <system value="urn:oid:2.16.840.1.113883.6.73‎"></system>
                <code value="M02AA15"></code>
              </coding>
              <text value="DICLAC sandoz lipogel 1 % Gel"></text>
            </medicationCodeableConcept>
          </MedicationOrder>
        </resource>
      </entry>
    </Bundle>

  val orders2 =

    <Bundle xmlns="http://hl7.org/fhir">
      <id value="e343cb63-503a-4b4b-85ec-c3e898be21d8"></id>
      <meta>
        <lastUpdated value="2016-07-22T15:06:35.606+02:00"></lastUpdated>
      </meta>
      <type value="searchset"></type>
      <total value="0"></total>
      <link>
        <relation value="self"></relation>
        <url value="http://localhost:8380/fhir/MedicationOrder?patient=qfbffca40d16e138205"></url>
      </link>
    </Bundle>
}
