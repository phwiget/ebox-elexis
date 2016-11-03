package models.patient

object XmlWrites {

  implicit val patientWrites = (p: Patient) => {

    <patient id={p.id}></patient>

  }

}
