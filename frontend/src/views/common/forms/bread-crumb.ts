
import {autoinject} from "aurelia-dependency-injection";
import {PatientService} from "../../../models/patient/patient-service";
import {bindable, BindingEngine,Disposable} from "aurelia-framework";
import {Patient} from "../../../models/patient/patient";

@autoinject
export class BreadCrumb{

    @bindable title: string= '';

    private subscription: Disposable;
    patientName: string = '';
    
    constructor(patientService: PatientService,bindingEngine: BindingEngine){

        this.patientValueChanged(patientService.selectedPatient,null);

        this.subscription = bindingEngine
            .propertyObserver(patientService,'selectedPatient')
            .subscribe(this.patientValueChanged.bind(this));
    }

    patientValueChanged(newValue: Patient, oldValue: Patient) {

        if (newValue !== undefined){
            this.patientName = newValue.name.fullName + " (" + newValue.gender.substr(0,1) + ")";
        }

    }

    unbind(){
        this.subscription.dispose();
    }

}