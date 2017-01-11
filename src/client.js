import angular from "angular";
import "angular-route";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "angular-modal-service";
import config from "./config.json";

let app = angular.module('app', ["ngRoute", "angularModalService"]);

// import bootstrap from "./bootstrap";
// bootstrap(app);
//
// import common from "./_common";
// common(app);
//
// import visual from "./_visual";
// visual(app);
//
// import books from "./books";
// books(app);
//
// import authors from "./authors";
// authors(app);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});
app.run(function($rootScope){
    $rootScope.title = config.applicationTitle || '';
});