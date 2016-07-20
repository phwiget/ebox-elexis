module.exports = {
  "bundles": {
    "dist/app-build": {
      "includes": [
        "[**/*.js]",
        "**/*.html!text",
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
        "aurelia-fetch-client",
        "aurelia-router",
        "aurelia-animator-css",
        "aurelia-templating-binding",
        "aurelia-polyfills",
        "aurelia-templating-resources",
        "aurelia-templating-router",
        "aurelia-loader-default",
        "aurelia-history-browser",
        "aurelia-logging-console",
        "bootstrap",
        "bootstrap/css/bootstrap.css!text",
        "fetch",
        "jquery",
        "material",
        "material-kit",
        "bootstrap-datepicker",
        "mmenu",
        "github:custom/creative_tim/css/material-all.css!text",
        "github:custom/mmenu/dist/css/hamburger.css!text",
        "github:custom/mmenu/dist/css/jquery.mmenu.custom.css!text"
      ],
      "options": {
        "inject": true,
        "minify": false,
        "depCache": true,
        "rev": true
      }
    }
  }
};
