import {Router, RouterConfiguration} from 'aurelia-router';
import 'material-kit';
import 'mmenu';


export class App {
  router: Router;


  configureRouter(config: RouterConfiguration, router: Router) {
    
    config.title = 'Elexis';

    config.map([
      { route: ['', 'home'], name: 'home',      moduleId: 'views/navigation/flat-menu',      nav: true, title: 'Home' },
      { route: 'welcome', name: 'welcome',      moduleId: 'views/samples/welcome',      nav: true, title: 'Welcome' },
      { route: 'components',    name: 'components',   moduleId: 'views/samples/components', nav: true, title: 'Components to Play' }
    ]);

    this.router = router;
  }


}
