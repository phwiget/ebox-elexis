package models.medication

import models.fhir.formats.XmlWrites._

object XmlWrites {

  def write(medicationOrder: MedicationOrder) =
    <MedicationOrder xmlns="http://hl7.org/fhir">
      <id value={medicationOrder.id}></id>

      {medicationOrder.identifier.map(toIdentifier)}

      <extension url="www.elexis.info/extensions/prescription/entrytype">
        <valueCode value={medicationOrder.entryType}></valueCode>
      </extension>

      {medicationOrder.article.map(toArticle).orNull}
      {medicationOrder.status.map(toStatus).orNull}

      <patient id={medicationOrder.patientId}></patient>

      {medicationOrder.notes.map(n => <note>{writeAnnotation(n)}</note> )}

      {medicationOrder.dosageInstructions.map(toDosageInstruction)}

      <medicationCodeableConcept>
        {writeCodeableConcept(medicationOrder.medicationCodeableConcept)}
      </medicationCodeableConcept>

      {medicationOrder.eventHistory.map(writeEvent)}

    </MedicationOrder>

  private def toIdentifier(identifier: String) = {
      <identifier>
        <system value="www.elexis.info/objid"></system>
        <value value={identifier}></value>
      </identifier>
  }

  private def toArticle(article: String)= {
    <text>
      <div xmlns="http://www.w3.org/1999/xhtml">{article}</div>
    </text>
  }

  private def toStatus(status: String)= <status value={status}></status>

  private def toDosageInstruction(dosageInstruction: DosageInstruction) = {

    <dosageInstruction>
      <text value={dosageInstruction.text.orNull}></text>

      {dosageInstruction.additionalInstructions.map(ai =>
        <additionalInstructions>
          {writeCodeableConcept(ai)}
        </additionalInstructions>
      ).orNull}

    </dosageInstruction>

  }

}
