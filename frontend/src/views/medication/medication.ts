import {PatientService} from "../../models/patient/patient-service";
import {MedicationService} from "../../models/medication/medication-service";
import {BindingEngine,Disposable} from "aurelia-framework";
import {Patient} from "../../models/patient/patient";
import {autoinject} from "aurelia-dependency-injection";
import {Materialize} from "../materialize";

@autoinject
export class Medication extends Materialize{

    private subscription: Disposable;
    private medicationService: MedicationService;
    private patientService: PatientService;

    medications: Array<any>;
    asc: boolean = false;
    sortKey: string = '';
    loading: boolean = false;
    history: boolean = false;
    
    constructor(patientService: PatientService, medicationService: MedicationService, bindingEngine: BindingEngine){
        super();

        this.medicationService = medicationService;
        this.patientService = patientService;

        this.patientValueChanged(patientService.selectedPatient,null);

        this.subscription = bindingEngine
            .propertyObserver(patientService,'selectedPatient')
            .subscribe(this.patientValueChanged.bind(this));


    }

    patientValueChanged(newValue: Patient, oldValue: Patient) {

        if (newValue){
            this.history = false;
            this.loadMedications(newValue.id);
            if (this.sortKey === '') {this.sortKey = 'dateWritten'}
        }

    }

    loadHistory(){

        this.history = !this.history;
        this.loadMedications(this.patientService.selectedPatient.id);

    }

    private loadMedications(patientId) {

        this.loading = true;

        var self = this;

        this.medicationService.list(patientId, this.history).then(m => {

            this.medications = m;
            //Call to make the action buttons dynamic
            super.attached();

        }).then(x => {
            setTimeout(
                function() {
                    self.loading = false;
                },
                20
            );
        });
    }

    sort(key: string){

        (key === this.sortKey) ? this.asc = !this.asc : this.sortKey = key;

    }

    unbind(){
        this.subscription.dispose();
    }
}