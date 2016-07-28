import {Constants} from "../../models/constants";
import {autoinject} from "aurelia-dependency-injection";
import {Router} from "aurelia-router";
import {PatientService} from "../../models/patient/patient-service";
import {Patient} from "../../models/patient/patient";

declare var $;
declare var mmenu;

@autoinject
export class SideMenu{

    private constants: Constants;
    private router: Router;
    private api: any = undefined;
    menu: any;
    patientService: PatientService;
    scope: any;

    constructor(constants: Constants, router: Router, patientService: PatientService){
        this.constants = constants;
        this.router = router;
        this.patientService = patientService;
        this.scope = this;
    }

    private addEventListeners(viewPortWidth: number){

        //We need local variables, as later on the scope of the current 'this' is lost
        var navbarMenu = this.constants.navbarMenu;
        var hamburger = this.constants.hambugerMenuClass;
        var api = $(navbarMenu).data( "mmenu" );

        var validateSwipe = function(target){

            var el = $(target);
            return el.hasClass('table-responsive') || el.hasClass('loader') || target.tagName === "TR" || target.tagName === "TD" || target.tagName === "TBODY";

        };

        this.api = api;

        api.bind( "close", function() {

            $(hamburger).removeClass("is-active");

        });

        api.bind( "open", function() {

            $(hamburger).addClass("is-active");
            // $(".typeahead-jquery").focus();

        });

        if (viewPortWidth < 768) {

            $(document.body).on("swiperight",function(event){


                if (!validateSwipe(event.target)){
                    if (!$(hamburger).hasClass("is-active")){api.open();}
                }


            });

            $(document.body).on("swipeleft",function(event){


                if (!validateSwipe(event.target)) {
                    if ($(hamburger).hasClass("is-active")) {
                        api.close();
                    }
                }

            });
        }

    }

    attached() {

        $(this.constants.navbarMenu).mmenu({
           // extensions: ["widescreen"]
        }, {
            pageSelector: this.constants.pageSelector
        });

        let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        this.addEventListeners(viewPortWidth);

        this.menu = $(this.constants.menuTitle);

        if ( viewPortWidth >= 768){
            this.api.open();
            $(this.constants.hambugerMenuClass).addClass("is-active");
        }

    }

    navigate(route: string){

        let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        this.router.navigateToRoute(route);

        if ( viewPortWidth < 768){

            this.api.close();
            $(this.constants.hambugerMenuClass).removeClass("is-active");

        }

    }

    request(query: string, scope: any ){

        return scope.patientService.list(query).then(patients => {

            return patients;

        });

    }

    display(p: Patient){

        return p.name.fullName + " (" + p.gender.substring(0,1) + ")" ;

    }

    onSelected(selected: Patient, scope: any ){

        let viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        scope.patientService.selectedPatient = selected;

        if ( viewPortWidth < 768){

            scope.api.close();
            $(scope.constants.hambugerMenuClass).removeClass("is-active");

        }

    }

}
