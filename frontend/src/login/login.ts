import 'material-kit';
import {Materialize} from "../views/materialize";

declare var jsRoutes: any;

export class Login extends Materialize{

    constructor(){
        super();
        console.log(jsRoutes.controllers.LoginCtrl.login().url);
    }

}
