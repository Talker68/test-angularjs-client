import template from './template.html';

export class ListingComponentController {

    constructor($injector, name){

        this.$injector = $injector;

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        this.data = [];
        this.errorMessage = '';

        this.loadData();

    }

    loadData(){
        this.loading = true;
        this.service.findAll().then(data => {
            this.data = data;
            this.loading = false;
        }, error => {
            this.errorMessage = error;
            this.loading = false;
        }).catch(error => {
            this.errorMessage = error;
            this.loading = false;
        });
    }

}

export function listingComponent (name) {
    return {

        controller: ($injector) => {
            return new ListingComponentController($injector, name)
        },

        get template(){
            return template
        }

    }
}