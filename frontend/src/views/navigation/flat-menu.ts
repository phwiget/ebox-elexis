import {Router} from "aurelia-router";
import {autoinject} from "aurelia-dependency-injection";

@autoinject
export class FlatMenu{

    constructor(private router: Router){

    }

    navigate(route: string){
        this.router.navigateToRoute(route);
    }

}