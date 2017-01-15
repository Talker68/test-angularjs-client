import {Service} from "./service";
import {ServiceBuilder} from "../../system/service-builder"
import {listingComponent} from "./listing";
import {itemComponent} from "./item";

const ModuleName = 'items';

export default function (app){

    ServiceBuilder.create(app, ModuleName, Service);

    app.component(`${ModuleName}Listing`, listingComponent(ModuleName));
    app.component(`${ModuleName}Item`, itemComponent(ModuleName));



    app.config(($routeProvider)=>{
        $routeProvider.when(`/${ModuleName}`, {
            template: `<${ModuleName}-listing></${ModuleName}-listing>`
        }).when(`/${ModuleName}/:id`, {
            template: params => `<${ModuleName}-item id="${params.id}" classes="container" back-url="/${ModuleName}"></${ModuleName}-item>`
        }).when(`/${ModuleName}/add`, {
            template: `<${ModuleName}-add></${ModuleName}-add>`
        }).when(`/${ModuleName}/edit/:id`, {
            template: params => `<${ModuleName}-edit id="${params.id}"></${ModuleName}-edit>`
        });
    });

}




