
import {autoinject} from "aurelia-dependency-injection";
import {MedicationService} from "../../models/medication/medication-service";
import {Materialize} from "../materialize";
import {PatientService} from "../../models/patient/patient-service";
import {Patient} from "../../models/patient/patient";

declare var $;

@autoinject
export class MedicationEdit extends Materialize{

    private medicationService: MedicationService;
    private collapse: any;
    private patient: Patient;

    medication: any;
    showFreetext: boolean = false;
    endDate: Date = null;
    saving: boolean = false;
    hasStopped: boolean = false;

    constructor(ms: MedicationService, ps: PatientService){
        super();

        this.medicationService = ms;
        this.medication = ms.selectedMedication;
        this.patient = ps.selectedPatient;

    }

    activate(params: any){

        if (this.medicationService.selectedMedication == null){

            this.medicationService.detail(params.id).then(m => {

                this.medicationService.selectedMedication = m;
                this.medication = m;
                this.showFreetext = !this.hasPosology(m);
                this.endDate = this.medication.dateEnded || new Date().getTime();

            });
        } else {
            this.showFreetext = !this.hasPosology(this.medication);
            this.endDate = this.medication.dateEnded || new Date().getTime();
        }

    }

    attached(){
        super.attached();
        this.collapse = $("#stop-inputs");
        if (this.medication.dateEnded != null){this.onStop();}
    }
    
    onStop(){

        this.hasStopped = !this.hasStopped;
        (this.hasStopped) ? this.collapse.collapse('show') : this.collapse.collapse('hide');

    }

    onTypeChanged(){
        this.medication.isReserve = !this.medication.isReserve;
    }

    hasPosology(medication: any){

       return (medication.posology || null) != null;

    }

    isNumeric(value: any){

        return (value == null) ? true : !isNaN(value);

    }

    save(){

        var self = this;

        this.saving = true;

        if (!this.showFreetext){this.medicationService.addInstructions(this.medication);}

        this.medicationService.concatInstructions(this.medication);

        if (this.hasStopped){
            this.medication.dateEnded = this.endDate;
        }

        this.medicationService.save(this.medication, this.patient.id).then(r => {


        }).then(() => {
            setTimeout(() => {
                self.saving = false;
            },1000)
        });

    }
    
    




}