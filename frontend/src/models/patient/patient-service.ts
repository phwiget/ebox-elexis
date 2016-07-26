import {autoinject} from "aurelia-dependency-injection";
import {HttpService} from "../http/http-service";
import {Patient} from "./patient";

declare var jsRoutes: any;

@autoinject
export class PatientService{

    private httpService: HttpService;
    errors: any = {};
    selectedPatient: Patient;

    constructor(httpService: HttpService){
        this.httpService = httpService;
    }

    list(search: string): Promise<Array<Patient>>{

        return this.httpService.get(jsRoutes.controllers.patient.PatientCtrl.list(search).url).then(r => {

            return Promise.resolve(this.map(r.response));

        },e => {

            return Promise.reject(e.response);

        })
        
    }

    private map(json: Array<any>): Array<Patient>{

        return json.map(e => {return new Patient(e);});

    }

}