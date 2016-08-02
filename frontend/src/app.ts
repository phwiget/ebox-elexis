import {Router, RouterConfiguration} from 'aurelia-router';
import 'material-kit';
import 'mmenu';


export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    
    // config.title = 'eBox-Elexis';

    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: 'views/navigation/flat-menu',      nav: true},
      { route: 'welcome', name: 'welcome',      moduleId: 'views/samples/welcome',      nav: true},
      { route: 'components',    name: 'components',   moduleId: 'views/samples/components', nav: true},
      { route: 'medication',    name: 'medication',   moduleId: 'views/medication/medication', nav: true},
      { route: 'agenda',    name: 'agenda',   moduleId: 'views/agenda/agenda', nav: true},
      { route: 'authentication',    name: 'authentication',   moduleId: 'views/settings/authentication', nav: true}

    ]);

    this.router = router;
  }

}
