import {PatientService} from "../../models/patient/patient-service";
import {MedicationService} from "../../models/medication/medication-service";
import {BindingEngine,Disposable} from "aurelia-framework";
import {Patient} from "../../models/patient/patient";
import {autoinject} from "aurelia-dependency-injection";
import {Materialize} from "../materialize";
import {Router} from "aurelia-router";
import {stateful} from "../../models/state/state-decorator";
import {StateProvider} from "../../models/state/state-provider";
import {MedicationOrder} from "../../models/medication/medication-order";

declare var document;
declare var $;

@autoinject
export class Medication extends Materialize{

    private subscription: Disposable;
    private medicationService: MedicationService;
    private patientService: PatientService;
    private deleteModal: any;
    private router: Router;
    private sp: StateProvider;

    medications: Array<MedicationOrder>;
    loading: boolean = false;

    @stateful(false)
    asc: boolean;
    @stateful('')
    sortKey: string;
    @stateful(false)
    history: boolean = false;
    @stateful('')
    search: string;
    @stateful(1)
    currentPage: number;

    constructor(patientService: PatientService, medicationService: MedicationService, bindingEngine: BindingEngine, router: Router, sp:StateProvider){
        super();

        this.sp = sp;
        sp.getState(this);

        this.router = router;

        this.medicationService = medicationService;
        this.patientService = patientService;

        this.patientValueChanged(patientService.selectedPatient,null);

        this.subscription = bindingEngine
            .propertyObserver(patientService,'selectedPatient')
            .subscribe(this.patientValueChanged.bind(this));

    }

    attached() {

        this.deleteModal = $('#deleteModal');
        this.deleteModal.appendTo('body');
        super.attached();

    }

    unbind(){
        this.subscription.dispose();
        this.deleteModal.remove();
        this.sp.setState(this);
    }

    patientValueChanged(newValue: Patient, oldValue: Patient) {

        if (newValue){
            this.loadMedications(newValue.id);
            if (this.sortKey === '') {this.sortKey = 'dateWritten'}
        }

    }

    loadHistory(){

        this.history = !this.history;
        if (!this.history) {this.search = '';}
        this.loadMedications(this.patientService.selectedPatient.id);

    }

    private loadMedications(patientId) {

        this.loading = true;

        var self = this;

        this.medicationService.list(patientId, this.history).then(m => {

            this.medications = m;

            //Call to make the action buttons dynamic
            super.attached();

        }).then(() => {
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

    edit(selection: MedicationOrder){

        this.medicationService.selectedMedication = selection.copy();
        this.router.navigateToRoute('medicationEdit',{"id":selection.id});

    }

    open(selection: any){
        this.medicationService.selectedMedication = selection;
        this.deleteModal.modal('show');
    }

    delete(){

        console.log("deleting " + this.medicationService.selectedMedication.id);
        this.deleteModal.modal('hide');

    }

}