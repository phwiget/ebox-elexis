# Ebox-Elexis Web-Application

eBox-Elexis is intentend to provide remote access to the ebox-elexis.

## Setup

* `git clone`
* resolve front-end dependencies: 
    * install node.js
    * install gulp via `npm install -g gulp`
    * install jspm via `npm install jspm`
    * run:
    * `cd frontend`
    * `npm install`
    * `jspm install -y`
    * `gulp build`
* go back to root directory: `cd ..`
* run on console: `activator run`
* open browser and access `localhost:9000`
* have fun

## Running tests
* `activator test`
* javascript: 
    * `cd frontend` 
    * `gulp test`

## Development Frontend
* `gulp watch`
* May disable caching in browser

## Development Backend
* `activator ~run` or
* `activator ~compile` etc

## Both together
* `activator run` or
* `gulp watch` (in /frontend)
* Access localhost:3000 and enjoy auto-refresh
  * Chrome is much faster at reloading than Firefox

## Elexis-Server
<https://github.com/elexis/elexis-server>
