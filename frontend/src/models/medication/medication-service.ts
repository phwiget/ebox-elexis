import {autoinject} from "aurelia-dependency-injection";
import {HttpService} from "../http/http-service";
import {MedicationOrder} from "../../models/medication/medication-order";



declare var jsRoutes: any;

@autoinject
export class MedicationService{

    private httpService: HttpService;
    private cache: any= {};
    private medicationKey: string = "medications_";
    private historyKey: string = "history_";

    selectedMedication: MedicationOrder;
    
    constructor(httpService: HttpService){
        this.httpService = httpService;
    }

    private key(patientId: string, history){
        return (history) ?  this.historyKey + patientId: this.medicationKey + patientId;
    }

    list(patientId: string, history: boolean = false): Promise<Array<MedicationOrder>>{

        let key = this.key(patientId,history);

        if (this.cache[key]){return Promise.resolve(this.cache[key]);}

        return this.httpService.get(jsRoutes.controllers.medication.MedicationCtrl.list(patientId, history).url).then(r => {

            let medications = r.response.map((m) => {
                return new MedicationOrder(m);
            });

            this.cache[key] = medications;

            return Promise.resolve(medications);

        },e => {

            return Promise.reject(e.response);

        })

    }

    detail(id: string): Promise<any>{

        return this.httpService.get(jsRoutes.controllers.medication.MedicationCtrl.detail(id).url).then(r => {

            return Promise.resolve(new MedicationOrder(r.response));

        },e => {

            return Promise.reject(e.response);

        })

    }

    save(medicationOrder: MedicationOrder, patientId: string): Promise<any>{

        medicationOrder.update();

        return this.httpService.post(jsRoutes.controllers.medication.MedicationCtrl.save().url, medicationOrder).then(r => {

            this.updateCache(patientId, r.response.id, medicationOrder);

            return Promise.resolve(r.response);

        },e => {

            return Promise.reject(e.response);

        })

    }

    private updateCache(patientId: string, id: string, medicationOrder: MedicationOrder){

        let keyNonHistory =  this.key(patientId,false);
        let keyHistory = this.key(patientId, true);

        var oldId = medicationOrder.id;
        medicationOrder.id = id;

        if (this.cache[keyHistory] != null){
            
            this.cache[keyHistory].push(medicationOrder);
            this.cache[keyHistory].forEach(entry =>{if (entry.id === oldId) entry.isHistory = true;});
            
        }

        if (this.cache[keyNonHistory] != null){

            this.cache[keyNonHistory].push(medicationOrder);

            var oldMedicationOrder = this.cache[keyNonHistory].filter(m => m.id === oldId)[0];
            this.cache[keyNonHistory].splice(this.cache[keyNonHistory].indexOf(oldMedicationOrder),1);

        }


    }


}