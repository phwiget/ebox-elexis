import {Router} from "aurelia-router";
import {autoinject} from "aurelia-dependency-injection";

@autoinject
export class FlatMenu{

    private router: Router;

    constructor(router: Router){
        this.router = router;
    }

    navigate(route: string){
        this.router.navigateToRoute(route);
    }

}