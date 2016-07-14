#Ebox-Elexis Web-Application

eBox-Elexis is intentend to provide remote access to the ebox-elexis.

##Setup

* `git clone`
* resolve front-end dependencies: 
    install node.js
    install gulp `npm install -g gulp`
    install jspm `npm install jspm`
    `cd frontend`
    `npm install`
    `jspm install -y`
* go back to root directory: `cd ..`
* run on console: `activator run`
* open browser and access `localhost:9000`

##Running tests
* `activator test`
* javascript: `cd frontend` `gulp test`