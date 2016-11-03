System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  meta: {
    "bootstrap": {
      "deps": [
        "jquery"
      ]
    },
    "material": {
      "deps": [
        "bootstrap"
      ]
    },
    "bootstrap-datepicker": {
      "deps": [
        "material"
      ]
    },
    "material-kit": {
      "deps": [
        "material"
      ]
    },
    "jquery-mobile": {
      "deps": [
        "jquery"
      ]
    },
    "mmenu": {
      "deps": [
        "jquery-mobile"
      ]
    },
    "typeahead.js": {
      "deps": [
        "jquery"
      ]
    }
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.1",
    "aurelia-framework": "npm:aurelia-framework@1.0.6",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
    "aurelia-http-client": "npm:aurelia-http-client@1.0.2",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
    "aurelia-router": "npm:aurelia-router@1.0.6",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.1.1",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "bootstrap-datepicker": "github:custom/creative_tim/js/bootstrap-datepicker.js",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "jquery-mobile": "github:custom/mmenu/src/js/jquery.mobile.custom.js",
    "material": "github:custom/creative_tim/js/material.min.js",
    "material-kit": "github:custom/creative_tim/js/material-kit.js",
    "mmenu": "github:custom/mmenu/src/js/jquery.mmenu.src.js",
    "text": "github:systemjs/plugin-text@0.0.8",
    "typeahead.js": "npm:typeahead.js@0.11.1",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-binding@1.0.9": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:aurelia-bootstrapper@1.0.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.6",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.6",
      "aurelia-templating": "npm:aurelia-templating@1.1.1",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.1.1",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0"
    },
    "npm:aurelia-dependency-injection@1.1.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-event-aggregator@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-framework@1.0.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-history-browser@1.0.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-http-client@1.0.2": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-loader-default@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0"
    },
    "npm:aurelia-metadata@1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-pal-browser@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-polyfills@1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-route-recognizer@1.1.0": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.0.6": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0",
      "aurelia-history": "npm:aurelia-history@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.1.0"
    },
    "npm:aurelia-task-queue@1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:aurelia-templating-binding@1.0.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-templating-resources@1.1.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-templating-router@1.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.6",
      "aurelia-templating": "npm:aurelia-templating@1.1.1"
    },
    "npm:aurelia-templating@1.1.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.9",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.1.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.1.0"
    },
    "npm:bluebird@3.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.31"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:typeahead.js@0.11.1": {
      "jquery": "npm:jquery@2.2.4",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  },
  depCache: {
    "app.js": [
      "material-kit",
      "mmenu"
    ],
    "login/login.js": [
      "../views/materialize",
      "aurelia-dependency-injection",
      "../models/http/http-service",
      "material-kit"
    ],
    "login/main.js": [
      "material"
    ],
    "main.js": [
      "material"
    ],
    "models/http/http-service.js": [
      "aurelia-http-client"
    ],
    "models/medication/medication-service.js": [
      "aurelia-dependency-injection",
      "../http/http-service",
      "../../models/medication/medication-order"
    ],
    "models/patient/patient-service.js": [
      "aurelia-dependency-injection",
      "../http/http-service",
      "./patient"
    ],
    "models/patient/patient.js": [
      "../person/human-name"
    ],
    "views/common/buttons/dot-button.js": [
      "aurelia-framework"
    ],
    "views/common/buttons/spinner-button.js": [
      "aurelia-framework"
    ],
    "views/common/converters/length.js": [
      "./filter"
    ],
    "views/common/converters/show.js": [
      "./filter"
    ],
    "views/common/date-picker.js": [
      "aurelia-dependency-injection",
      "aurelia-framework",
      "bootstrap-datepicker"
    ],
    "views/common/focus-me.js": [
      "aurelia-framework"
    ],
    "views/common/forms/bread-crumb.js": [
      "aurelia-dependency-injection",
      "../../../models/patient/patient-service",
      "aurelia-framework"
    ],
    "views/common/pagination/pagination.js": [
      "aurelia-framework"
    ],
    "views/common/select-all.js": [
      "aurelia-framework"
    ],
    "views/common/typeahead/typeahead.js": [
      "aurelia-dependency-injection",
      "aurelia-framework",
      "typeahead.js"
    ],
    "views/medication/medication-edit.js": [
      "aurelia-dependency-injection",
      "../../models/medication/medication-service",
      "../materialize",
      "../../models/patient/patient-service"
    ],
    "views/medication/medication.js": [
      "../../models/patient/patient-service",
      "../../models/medication/medication-service",
      "aurelia-framework",
      "aurelia-dependency-injection",
      "../materialize",
      "aurelia-router",
      "../../models/state/state-decorator",
      "../../models/state/state-provider"
    ],
    "views/navigation/flat-menu.js": [
      "aurelia-router",
      "aurelia-dependency-injection"
    ],
    "views/navigation/nav-bar.js": [
      "../../models/constants",
      "aurelia-dependency-injection"
    ],
    "views/navigation/side-menu.js": [
      "../../models/constants",
      "aurelia-dependency-injection",
      "aurelia-router",
      "../../models/patient/patient-service"
    ],
    "views/samples/components.js": [
      "../materialize"
    ],
    "views/samples/welcome.js": [
      "aurelia-framework",
      "../materialize",
      "../../models/patient/patient-service",
      "../../models/medication/medication-service"
    ],
    "npm:typeahead.js@0.11.1.js": [
      "npm:typeahead.js@0.11.1/dist/typeahead.bundle.js",
      "jquery"
    ],
    "npm:jquery@2.2.4.js": [
      "npm:jquery@2.2.4/dist/jquery.js"
    ],
    "npm:typeahead.js@0.11.1/dist/typeahead.bundle.js": [
      "jquery",
      "process"
    ],
    "github:jspm/nodelibs-process@0.1.2.js": [
      "github:jspm/nodelibs-process@0.1.2/index"
    ],
    "github:jspm/nodelibs-process@0.1.2/index.js": [
      "process"
    ],
    "npm:process@0.11.9.js": [
      "npm:process@0.11.9/browser.js"
    ],
    "github:custom/mmenu/src/js/jquery.mmenu.src.js": [
      "jquery-mobile"
    ],
    "github:custom/mmenu/src/js/jquery.mobile.custom.js": [
      "jquery"
    ],
    "github:custom/creative_tim/js/bootstrap-datepicker.js": [
      "material"
    ],
    "github:custom/creative_tim/js/material.min.js": [
      "bootstrap"
    ],
    "github:twbs/bootstrap@3.3.7.js": [
      "github:twbs/bootstrap@3.3.7/js/bootstrap.js",
      "jquery"
    ],
    "github:twbs/bootstrap@3.3.7/js/bootstrap.js": [
      "jquery"
    ],
    "github:custom/creative_tim/js/material-kit.js": [
      "material"
    ],
    "github:systemjs/plugin-text@0.0.8.js": [
      "github:systemjs/plugin-text@0.0.8/text"
    ],
    "npm:aurelia-http-client@1.0.2.js": [
      "npm:aurelia-http-client@1.0.2/aurelia-http-client"
    ],
    "npm:aurelia-http-client@1.0.2/aurelia-http-client.js": [
      "aurelia-path",
      "aurelia-pal"
    ],
    "npm:aurelia-path@1.1.1.js": [
      "npm:aurelia-path@1.1.1/aurelia-path"
    ],
    "npm:aurelia-pal@1.0.0.js": [
      "npm:aurelia-pal@1.0.0/aurelia-pal"
    ],
    "npm:aurelia-logging-console@1.0.0.js": [
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console"
    ],
    "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js": [
      "aurelia-logging"
    ],
    "npm:aurelia-logging@1.0.0.js": [
      "npm:aurelia-logging@1.0.0/aurelia-logging"
    ],
    "npm:aurelia-history-browser@1.0.0.js": [
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser"
    ],
    "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js": [
      "aurelia-pal",
      "aurelia-history"
    ],
    "npm:aurelia-history@1.0.0.js": [
      "npm:aurelia-history@1.0.0/aurelia-history"
    ],
    "npm:aurelia-loader-default@1.0.0.js": [
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default"
    ],
    "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js": [
      "aurelia-loader",
      "aurelia-pal",
      "aurelia-metadata"
    ],
    "npm:aurelia-loader@1.0.0.js": [
      "npm:aurelia-loader@1.0.0/aurelia-loader"
    ],
    "npm:aurelia-metadata@1.0.1.js": [
      "npm:aurelia-metadata@1.0.1/aurelia-metadata"
    ],
    "npm:aurelia-loader@1.0.0/aurelia-loader.js": [
      "aurelia-path",
      "aurelia-metadata"
    ],
    "npm:aurelia-metadata@1.0.1/aurelia-metadata.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating-router@1.0.0.js": [
      "npm:aurelia-templating-router@1.0.0/aurelia-templating-router"
    ],
    "npm:aurelia-templating-router@1.0.0/aurelia-templating-router.js": [
      "aurelia-router",
      "./route-loader",
      "./router-view",
      "./route-href"
    ],
    "npm:aurelia-router@1.0.6.js": [
      "npm:aurelia-router@1.0.6/aurelia-router"
    ],
    "npm:aurelia-router@1.0.6/aurelia-router.js": [
      "aurelia-logging",
      "aurelia-route-recognizer",
      "aurelia-dependency-injection",
      "aurelia-history",
      "aurelia-event-aggregator"
    ],
    "npm:aurelia-route-recognizer@1.1.0.js": [
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer"
    ],
    "npm:aurelia-dependency-injection@1.1.0.js": [
      "npm:aurelia-dependency-injection@1.1.0/aurelia-dependency-injection"
    ],
    "npm:aurelia-event-aggregator@1.0.0.js": [
      "npm:aurelia-event-aggregator@1.0.0/aurelia-event-aggregator"
    ],
    "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js": [
      "aurelia-path"
    ],
    "npm:aurelia-dependency-injection@1.1.0/aurelia-dependency-injection.js": [
      "aurelia-metadata",
      "aurelia-pal"
    ],
    "npm:aurelia-event-aggregator@1.0.0/aurelia-event-aggregator.js": [
      "aurelia-logging"
    ],
    "npm:aurelia-templating-router@1.0.0/router-view.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-router",
      "aurelia-metadata",
      "aurelia-pal"
    ],
    "npm:aurelia-templating@1.1.1.js": [
      "npm:aurelia-templating@1.1.1/aurelia-templating"
    ],
    "npm:aurelia-templating@1.1.1/aurelia-templating.js": [
      "aurelia-logging",
      "aurelia-metadata",
      "aurelia-pal",
      "aurelia-path",
      "aurelia-loader",
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-task-queue"
    ],
    "npm:aurelia-binding@1.0.9.js": [
      "npm:aurelia-binding@1.0.9/aurelia-binding"
    ],
    "npm:aurelia-task-queue@1.1.0.js": [
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue"
    ],
    "npm:aurelia-binding@1.0.9/aurelia-binding.js": [
      "aurelia-logging",
      "aurelia-pal",
      "aurelia-task-queue",
      "aurelia-metadata"
    ],
    "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating-router@1.0.0/route-loader.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-router",
      "aurelia-path",
      "aurelia-metadata"
    ],
    "npm:aurelia-templating-router@1.0.0/route-href.js": [
      "aurelia-templating",
      "aurelia-dependency-injection",
      "aurelia-router",
      "aurelia-pal",
      "aurelia-logging"
    ],
    "npm:aurelia-templating-resources@1.1.1.js": [
      "npm:aurelia-templating-resources@1.1.1/aurelia-templating-resources"
    ],
    "npm:aurelia-templating-resources@1.1.1/aurelia-templating-resources.js": [
      "./compose",
      "./if",
      "./with",
      "./repeat",
      "./show",
      "./hide",
      "./sanitize-html",
      "./replaceable",
      "./focus",
      "aurelia-templating",
      "./css-resource",
      "./html-sanitizer",
      "./attr-binding-behavior",
      "./binding-mode-behaviors",
      "./throttle-binding-behavior",
      "./debounce-binding-behavior",
      "./signal-binding-behavior",
      "./binding-signaler",
      "./update-trigger-binding-behavior",
      "./abstract-repeater",
      "./repeat-strategy-locator",
      "./html-resource-plugin",
      "./null-repeat-strategy",
      "./array-repeat-strategy",
      "./map-repeat-strategy",
      "./set-repeat-strategy",
      "./number-repeat-strategy",
      "./repeat-utilities",
      "./analyze-view-factory",
      "./aurelia-hide-style"
    ],
    "npm:aurelia-templating-resources@1.1.1/signal-binding-behavior.js": [
      "./binding-signaler"
    ],
    "npm:aurelia-templating-resources@1.1.1/repeat-strategy-locator.js": [
      "./null-repeat-strategy",
      "./array-repeat-strategy",
      "./map-repeat-strategy",
      "./set-repeat-strategy",
      "./number-repeat-strategy"
    ],
    "npm:aurelia-templating-resources@1.1.1/map-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.1.1/number-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.1.1/set-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.1.1/aurelia-hide-style.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.1.1/compose.js": [
      "aurelia-dependency-injection",
      "aurelia-task-queue",
      "aurelia-templating",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.1.1/if.js": [
      "aurelia-templating",
      "aurelia-dependency-injection"
    ],
    "npm:aurelia-templating-resources@1.1.1/with.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/repeat.js": [
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-templating",
      "./repeat-strategy-locator",
      "./repeat-utilities",
      "./analyze-view-factory",
      "./abstract-repeater"
    ],
    "npm:aurelia-templating-resources@1.1.1/show.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-pal",
      "./aurelia-hide-style"
    ],
    "npm:aurelia-templating-resources@1.1.1/hide.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-pal",
      "./aurelia-hide-style"
    ],
    "npm:aurelia-templating-resources@1.1.1/sanitize-html.js": [
      "aurelia-binding",
      "aurelia-dependency-injection",
      "./html-sanitizer"
    ],
    "npm:aurelia-templating-resources@1.1.1/replaceable.js": [
      "aurelia-dependency-injection",
      "aurelia-templating"
    ],
    "npm:aurelia-templating-resources@1.1.1/focus.js": [
      "aurelia-templating",
      "aurelia-binding",
      "aurelia-dependency-injection",
      "aurelia-task-queue",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.1.1/css-resource.js": [
      "aurelia-templating",
      "aurelia-loader",
      "aurelia-dependency-injection",
      "aurelia-path",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.1.1/attr-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/binding-mode-behaviors.js": [
      "aurelia-binding",
      "aurelia-metadata"
    ],
    "npm:aurelia-templating-resources@1.1.1/debounce-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/throttle-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/binding-signaler.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/update-trigger-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/html-resource-plugin.js": [
      "aurelia-templating",
      "./dynamic-element"
    ],
    "npm:aurelia-templating-resources@1.1.1/array-repeat-strategy.js": [
      "./repeat-utilities",
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/repeat-utilities.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.1.1/dynamic-element.js": [
      "aurelia-templating"
    ],
    "npm:aurelia-polyfills@1.1.1.js": [
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills"
    ],
    "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating-binding@1.0.0.js": [
      "npm:aurelia-templating-binding@1.0.0/aurelia-templating-binding"
    ],
    "npm:aurelia-templating-binding@1.0.0/aurelia-templating-binding.js": [
      "aurelia-logging",
      "aurelia-binding",
      "aurelia-templating"
    ],
    "npm:aurelia-bootstrapper@1.0.0.js": [
      "npm:aurelia-bootstrapper@1.0.0/aurelia-bootstrapper"
    ],
    "npm:aurelia-bootstrapper@1.0.0/aurelia-bootstrapper.js": [
      "aurelia-pal",
      "aurelia-pal-browser",
      "aurelia-polyfills"
    ],
    "npm:aurelia-pal-browser@1.0.0.js": [
      "npm:aurelia-pal-browser@1.0.0/aurelia-pal-browser"
    ],
    "npm:aurelia-pal-browser@1.0.0/aurelia-pal-browser.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-framework@1.0.6.js": [
      "npm:aurelia-framework@1.0.6/aurelia-framework"
    ],
    "npm:aurelia-framework@1.0.6/aurelia-framework.js": [
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-metadata",
      "aurelia-templating",
      "aurelia-loader",
      "aurelia-task-queue",
      "aurelia-path",
      "aurelia-pal",
      "aurelia-logging"
    ]
  },
  bundles: {
    "app-build-46dad4d014.js": [
      "app.js",
      "login/login.js",
      "login/main.js",
      "main.js",
      "models/constants.js",
      "models/http/http-service.js",
      "models/medication/medication-order.js",
      "models/medication/medication-service.js",
      "models/patient/patient-service.js",
      "models/patient/patient.js",
      "models/person/human-name.js",
      "models/state/state-decorator.js",
      "models/state/state-provider.js",
      "styles/custom.css!github:systemjs/plugin-text@0.0.8.js",
      "styles/loader.css!github:systemjs/plugin-text@0.0.8.js",
      "styles/typeahead.css!github:systemjs/plugin-text@0.0.8.js",
      "views/agenda/agenda.js",
      "views/common/buttons/dot-button.js",
      "views/common/buttons/spinner-button.js",
      "views/common/converters/date-format.js",
      "views/common/converters/filter.js",
      "views/common/converters/is-numeric.js",
      "views/common/converters/length.js",
      "views/common/converters/limit.js",
      "views/common/converters/paginate.js",
      "views/common/converters/show.js",
      "views/common/converters/sort.js",
      "views/common/converters/take.js",
      "views/common/date-picker.js",
      "views/common/focus-me.js",
      "views/common/forms/bread-crumb.js",
      "views/common/pagination/pagination.js",
      "views/common/select-all.js",
      "views/common/typeahead/typeahead.js",
      "views/materialize.js",
      "views/medication/medication-edit.js",
      "views/medication/medication.js",
      "views/navigation/flat-menu.js",
      "views/navigation/nav-bar.js",
      "views/navigation/side-menu.js",
      "views/samples/animation.js",
      "views/samples/components.js",
      "views/samples/welcome.js",
      "views/settings/authentication.js"
    ],
    "aurelia-043f60b802.js": [
      "github:custom/creative_tim/css/material-all.css!github:systemjs/plugin-text@0.0.8.js",
      "github:custom/creative_tim/js/bootstrap-datepicker.js",
      "github:custom/creative_tim/js/material-kit.js",
      "github:custom/creative_tim/js/material.min.js",
      "github:custom/mmenu/dist/css/hamburger.css!github:systemjs/plugin-text@0.0.8.js",
      "github:custom/mmenu/dist/css/jquery.mmenu.custom.css!github:systemjs/plugin-text@0.0.8.js",
      "github:custom/mmenu/src/js/jquery.mmenu.src.js",
      "github:custom/mmenu/src/js/jquery.mobile.custom.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "github:systemjs/plugin-text@0.0.8.js",
      "github:systemjs/plugin-text@0.0.8/text.js",
      "github:twbs/bootstrap@3.3.7.js",
      "github:twbs/bootstrap@3.3.7/css/bootstrap.css!github:systemjs/plugin-text@0.0.8.js",
      "github:twbs/bootstrap@3.3.7/js/bootstrap.js",
      "npm:aurelia-binding@1.0.9.js",
      "npm:aurelia-binding@1.0.9/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0.js",
      "npm:aurelia-bootstrapper@1.0.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.1.0.js",
      "npm:aurelia-dependency-injection@1.1.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0.js",
      "npm:aurelia-event-aggregator@1.0.0/aurelia-event-aggregator.js",
      "npm:aurelia-framework@1.0.6.js",
      "npm:aurelia-framework@1.0.6/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0.js",
      "npm:aurelia-history-browser@1.0.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0.js",
      "npm:aurelia-history@1.0.0/aurelia-history.js",
      "npm:aurelia-http-client@1.0.2.js",
      "npm:aurelia-http-client@1.0.2/aurelia-http-client.js",
      "npm:aurelia-loader-default@1.0.0.js",
      "npm:aurelia-loader-default@1.0.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0.js",
      "npm:aurelia-loader@1.0.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0.js",
      "npm:aurelia-logging-console@1.0.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0.js",
      "npm:aurelia-logging@1.0.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.1.js",
      "npm:aurelia-metadata@1.0.1/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0.js",
      "npm:aurelia-pal-browser@1.0.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0.js",
      "npm:aurelia-pal@1.0.0/aurelia-pal.js",
      "npm:aurelia-path@1.1.1.js",
      "npm:aurelia-path@1.1.1/aurelia-path.js",
      "npm:aurelia-polyfills@1.1.1.js",
      "npm:aurelia-polyfills@1.1.1/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.1.0.js",
      "npm:aurelia-route-recognizer@1.1.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.6.js",
      "npm:aurelia-router@1.0.6/aurelia-router.js",
      "npm:aurelia-task-queue@1.1.0.js",
      "npm:aurelia-task-queue@1.1.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0.js",
      "npm:aurelia-templating-binding@1.0.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.1.1.js",
      "npm:aurelia-templating-resources@1.1.1/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.1.1/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.1.1/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/attr-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/aurelia-hide-style.js",
      "npm:aurelia-templating-resources@1.1.1/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.1.1/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.1.1/binding-signaler.js",
      "npm:aurelia-templating-resources@1.1.1/compose.js",
      "npm:aurelia-templating-resources@1.1.1/css-resource.js",
      "npm:aurelia-templating-resources@1.1.1/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/dynamic-element.js",
      "npm:aurelia-templating-resources@1.1.1/focus.js",
      "npm:aurelia-templating-resources@1.1.1/hide.js",
      "npm:aurelia-templating-resources@1.1.1/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.1.1/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.1.1/if.js",
      "npm:aurelia-templating-resources@1.1.1/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.1.1/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.1.1/repeat.js",
      "npm:aurelia-templating-resources@1.1.1/replaceable.js",
      "npm:aurelia-templating-resources@1.1.1/sanitize-html.js",
      "npm:aurelia-templating-resources@1.1.1/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.1.1/show.js",
      "npm:aurelia-templating-resources@1.1.1/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.1.1/with.js",
      "npm:aurelia-templating-router@1.0.0.js",
      "npm:aurelia-templating-router@1.0.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0/router-view.js",
      "npm:aurelia-templating@1.1.1.js",
      "npm:aurelia-templating@1.1.1/aurelia-templating.js",
      "npm:jquery@2.2.4.js",
      "npm:jquery@2.2.4/dist/jquery.js",
      "npm:process@0.11.9.js",
      "npm:process@0.11.9/browser.js",
      "npm:typeahead.js@0.11.1.js",
      "npm:typeahead.js@0.11.1/dist/typeahead.bundle.js"
    ]
  }
});