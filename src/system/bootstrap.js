import config from "../config.json";

class Config {

    constructor($routeProvider, $httpProvider, $locationProvider){

        $routeProvider.otherwise(`${config.defaultMenuItem}`);
        $locationProvider.html5Mode(true);
        //$httpProvider.interceptors.push('Interceptor');

    }

}



export default function(app){

    app.config([
        '$routeProvider', '$httpProvider', '$locationProvider',
        ($routeProvider, $httpProvider, $locationProvider)=>new Config($routeProvider, $httpProvider, $locationProvider)
    ]);

}