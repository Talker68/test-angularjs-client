import template from './template.html';
import './styles.less';

export class ListingComponentController {

    constructor($injector, name){

        this.$injector = $injector;

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        this.title = name;
        this.data = [];
        this.errorMessage = '';
        this.current = 0;

        this.loadData();

    }

    loadData(){
        this.loading = true;
        this.service.findAll().then(data => {
            this.data = data;
            this.current = this.data[0].id;
            this.loading = false;
        }, error => {
            this.errorMessage = error;
            this.loading = false;
        }).catch(error => {
            this.errorMessage = error;
            this.loading = false;
        });
    }

    setCurrent(item){
        this.current = item.id;
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