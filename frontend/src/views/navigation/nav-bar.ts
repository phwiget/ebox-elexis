import {Constants} from "../../models/constants";
import {autoinject} from "aurelia-dependency-injection";

declare var $;
declare var mmenu;

@autoinject
export class NavBar{

    private api: any = undefined;
    private constants: Constants;

    constructor(constants: Constants){
        this.constants = constants;
    }

    toggle() {

        if (this.api === undefined){

            this.api = $(this.constants.navbarMenu).data( "mmenu" );

        }

        if ($(this.constants.hambugerMenuClass).hasClass("is-active")){this.api.close();} else {this.api.open();}

    }


    
    
}
