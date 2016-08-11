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

        let keyNonHistory =  this.key(patientId,false);
        let keyHistory = this.key(patientId, true);

        var self = this;

        medicationOrder.update();

        return this.httpService.post(jsRoutes.controllers.medication.MedicationCtrl.save().url, medicationOrder).then(r => {

            this.updateCache(medicationOrder,keyNonHistory, self);
            this.updateCache(medicationOrder, keyHistory,self);

            return Promise.resolve(r.response);

        },e => {

            return Promise.reject(e.response);

        })

    }

    private updateCache(medicationOrder: any, key: string, scope: any){

        if (this.cache[key] == null){return;}

        this.cache[key] = this.cache[key].map(entry =>{

            return (entry.id === medicationOrder.id) ? medicationOrder : entry

        });

    }

    // concatInstructions(medication: any){
    //
    //     if (medication.additionalInstructions == null && medication.instructions != null){
    //         medication.dosage = medication.instructions;
    //     } else if (medication.additionalInstructions != null && medication.instructions != null) {
    //         medication.dosage = medication.instructions + ", " + medication.additionalInstructions;
    //     }
    //
    //     return medication;
    // }
    //
    // extractPosology(medication: any){
    //
    //     var pattern = /^([0-9.]{1,5})([-])([0-9.]{1,5})([-])([0-9.]{1,5})([-])([0-9.]{0,5})([0-9])$/;
    //     var str = pattern.exec(medication.instructions);
    //
    //     if (str !== null){
    //
    //         medication.posology = {};
    //
    //         str[0].split("-").forEach((d,i) => {
    //
    //             var dosage = parseFloat(d);
    //             switch(i){
    //                 case 0:
    //                     medication.posology.morning = dosage;
    //                     break;
    //                 case 1:
    //                     medication.posology.midday = dosage;
    //                     break;
    //                 case 2:
    //                     medication.posology.evening = dosage;
    //                     break;
    //                 case 3:
    //                     medication.posology.night = dosage;
    //             }
    //
    //         });
    //     }
    //
    //     return medication;
    // }
    //
    // addInstructions(m: any){
    //
    //     let keys = ["morning", "midday", "evening", "night"];
    //
    //     m.instructions = keys.map(function (key) {
    //
    //         return (m.posology[key] == null) ? "0" : m.posology[key].toString();
    //
    //     }).join("-");
    //
    // }

}