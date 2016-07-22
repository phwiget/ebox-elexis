import 'material-kit';
import {Materialize} from "../views/materialize";
import {autoinject} from "aurelia-dependency-injection";
import {HttpService} from "../models/http/http-service";

declare var jsRoutes: any;
declare var window;

@autoinject
export class Login extends Materialize{

    private httpService: HttpService;
    credentials: any;
    isRequesting: boolean = false;
    errors: any = {};

    constructor(httpService: HttpService){
        super();
        this.httpService = httpService;
    }

    login(){

        this.isRequesting = true;

        this.httpService.post(jsRoutes.controllers.login.LoginCtrl.login().url,this.credentials).then(r => {

            window.location = r.response.url || jsRoutes.controllers.login.LoginCtrl.index().url;

        },e => {

            this.errors = e.response;

        }).then(x => this.isRequesting = false);

    }

    get disabled(){

        return this.credentials ===undefined || this.credentials.username === undefined || this.credentials.username.length === 0 || this.credentials.password === undefined || this.credentials.password.length === 0

    }

}
