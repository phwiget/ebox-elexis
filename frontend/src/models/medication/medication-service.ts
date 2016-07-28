import {autoinject} from "aurelia-dependency-injection";
import {HttpService} from "../http/http-service";


declare var jsRoutes: any;

@autoinject
export class MedicationService{

    private httpService: HttpService;
    private cache: any= {};
    private medicationKey: string = "medications_";
    private historyKey: string = "history_";

    constructor(httpService: HttpService){
        this.httpService = httpService;
    }

    private key(patientId: string, history){
        return (history) ?  this.historyKey + patientId: this.medicationKey + patientId;
    }

    list(patientId: string, history: boolean = false): Promise<any>{

        let key = this.key(patientId,history);

        if (this.cache[key]){return Promise.resolve(this.cache[key]);}

        return this.httpService.get(jsRoutes.controllers.medication.MedicationCtrl.list(patientId, history).url).then(r => {

            this.cache[key] = r.response;

            return Promise.resolve(r.response);

        },e => {

            return Promise.reject(e.response);

        })

    }

    save(medicationOrder: any, patientId: string): Promise<any>{

        let keyNonHistory =  this.key(patientId,false);
        let keyHistory = this.key(patientId, true);

        return this.httpService.post(jsRoutes.controllers.medication.MedicationCtrl.save().url, medicationOrder).then(r => {

            this.updateCache(medicationOrder,keyNonHistory);
            this.updateCache(medicationOrder, keyHistory);

            return Promise.resolve(r.response);

        },e => {

            return Promise.reject(e.response);

        })

    }

    private updateCache(medicationOrder: any, key: string){

        this.cache[key] = this.cache[key].map(entry =>{

            return (entry.id === medicationOrder.id) ? medicationOrder : entry

        });

    }

}