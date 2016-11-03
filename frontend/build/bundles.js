module.exports = {
  "bundles": {
    "dist/app-build": {
      "includes": [
        "[**/*.js]",
        //"**/*.html!text",
        "**/*.css!text"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": true
      }
    },
    "dist/aurelia": {
      "includes": [
        "aurelia-framework",
        "aurelia-bootstrapper",
        "aurelia-router",
        "aurelia-templating-binding",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "aurelia-http-client",
        "text",
        "bootstrap",
        "bootstrap/css/bootstrap.css!text",
        "jquery",
        "jquery-mobile",
        "github:custom/mmenu/dist/css/jquery.mmenu.custom.css!text",
        "github:custom/mmenu/dist/css/hamburger.css!text",
        "github:custom/creative_tim/css/material-all.css!text",
        "material",
        "material-kit",
        "bootstrap-datepicker",
        "mmenu",
        "typeahead.js"
      ],
      "options": {
        "inject": true,
        "minify": true,
        "depCache": true,
        "rev": true
      }
    }
  }
};
