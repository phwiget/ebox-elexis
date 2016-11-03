
import {autoinject} from "aurelia-dependency-injection";
import {MedicationService} from "../../models/medication/medication-service";
import {Materialize} from "../materialize";
import {PatientService} from "../../models/patient/patient-service";
import {Patient} from "../../models/patient/patient";
import {MedicationOrder} from "../../models/medication/medication-order";

declare var $;

@autoinject
export class MedicationEdit extends Materialize{

    private medicationService: MedicationService;
    private collapse: any;
    private patient: Patient;

    medication: MedicationOrder;
    saving: boolean = false;
    success: boolean = false;
    e: any;


    constructor(ms: MedicationService, ps: PatientService){
        super();

        this.medicationService = ms;
        this.medication = ms.selectedMedication;
        this.patient = ps.selectedPatient;

    }

    activate(params: any){

        if (this.medicationService.selectedMedication == null){

            this.medicationService.detail(params.id).then(m => {

                this.medication = m;
                if (this.medication.hasBeenStopped) this.collapse.collapse('show');

            });
        }

    }

    attached(){
        super.attached();
        this.collapse = $("#stop-inputs");
        if (this.medication != null && this.medication.hasBeenStopped){this.collapse.collapse('show');}
    }
    
    onStop(){

        this.medication.hasBeenStopped = !this.medication.hasBeenStopped;
        (this.medication.hasBeenStopped) ? this.collapse.collapse('show') : this.collapse.collapse('hide');

    }

    onTypeChanged(){
        this.medication.isReserve = !this.medication.isReserve;
    }


    isNumeric(value: any){

        return (value == null) ? true : !isNaN(value);

    }

    save(){

        var self = this;

        this.success = false;
        this.saving = true;

        this.medicationService.save(this.medication, this.patient.id).then(r => {

            this.success = true;
            
        }, e => {

            this.e = e;

        }).then(() => {
            setTimeout(() => {
                self.saving = false;
            },1000)
        });

    }

    get validate(){

        return (this.medication.showFreetext) ? false : !(this.isNumeric(this.medication.posology.morning) && this.isNumeric(this.medication.posology.midday) && this.isNumeric(this.medication.posology.evening) && this.isNumeric(this.medication.posology.night))

    }
    
    




}