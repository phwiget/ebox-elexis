import {autoinject} from "aurelia-dependency-injection";
import {HttpService} from "../http/http-service";


declare var jsRoutes: any;

@autoinject
export class MedicationService{

    private httpService: HttpService;

    constructor(httpService: HttpService){
        this.httpService = httpService;
    }

    list(patientId: string): Promise<any>{

        return this.httpService.get(jsRoutes.controllers.medication.MedicationCtrl.list(patientId).url).then(r => {

            return Promise.resolve(r.response);

        },e => {

            return Promise.reject(e.response);

        })

    }


}