import {Router, RouterConfiguration} from 'aurelia-router';
import 'material-kit';
import 'mmenu';

export class App {
  router: Router;


  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'views/samples/welcome',      nav: true, title: 'Home' },
      { route: 'components',    name: 'components',   moduleId: 'views/samples/components', nav: true, title: 'Components to Play' }
    ]);

    this.router = router;
  }


}
