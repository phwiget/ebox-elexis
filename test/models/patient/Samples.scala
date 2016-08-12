package models.patient

trait Samples {

  val patient1 =
    <Patient xmlns="http://hl7.org/fhir">
      <id value="if69a4f3141137d308"></id>
      <identifier>
        <system value="www.elexis.info/patnr"></system>
        <value value="2"></value>
      </identifier>
      <identifier>
        <system value="www.elexis.info/objid"></system>
        <value value="if69a4f3141137d308"></value>
      </identifier>
      <name>
        <family value="Meier"></family>
        <given value="Maria"></given>
      </name>
      <gender value="female"></gender>
    </Patient>

  val patients1 =
    <Bundle xmlns="http://hl7.org/fhir">
      <id value="9415ef27-b7be-41d5-878e-e2ccacf0a818"></id>
      <meta>
        <lastUpdated value="2016-07-21T16:39:57.751+02:00"></lastUpdated>
      </meta>
      <type value="searchset"></type>
      <total value="2"></total>
      <link>
        <relation value="self"></relation>
        <url value="http://localhost:8380/fhir/Patient?name=M"></url>
      </link>
      <entry>
        <fullUrl value="http://localhost:8380/fhir/Patient/if69a4f3141137d308"></fullUrl>
        <resource>
          <Patient xmlns="http://hl7.org/fhir">
            <id value="if69a4f3141137d308"></id>
            <identifier>
              <system value="www.elexis.info/patnr"></system>
              <value value="2"></value>
            </identifier>
            <identifier>
              <system value="www.elexis.info/objid"></system>
              <value value="if69a4f3141137d308"></value>
            </identifier>
            <name>
              <family value="Meier"></family>
              <given value="Maria"></given>
            </name>
            <gender value="female"></gender>
          </Patient>
        </resource>
      </entry>
      <entry>
        <fullUrl value="http://localhost:8380/fhir/Patient/qfbffca40d16e1382050"></fullUrl>
        <resource>
          <Patient xmlns="http://hl7.org/fhir">
            <id value="qfbffca40d16e1382050"></id>
            <identifier>
              <system value="www.elexis.info/patnr"></system>
              <value value="1"></value>
            </identifier>
            <identifier>
              <system value="www.elexis.info/objid"></system>
              <value value="qfbffca40d16e1382050"></value>
            </identifier>
            <name>
              <family value="Jabui"></family>
              <given value="Miroslav"></given>
            </name>
            <gender value="male"></gender>
          </Patient>
        </resource>
      </entry>
    </Bundle>

  val patientsEmpty = <asfd></asfd>
}
