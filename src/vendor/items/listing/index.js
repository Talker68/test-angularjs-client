import template from './template.html';
import './styles.less';

export class ListingComponentController {

    constructor($scope, $injector, name){

        this.$scope = $scope;
        this.$injector = $injector;

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        this.title = name;
        this.data = [];
        this.errorMessage = '';
        this.current = 0;

        this.loadData();

    }

    async loadData(){
        this.loading = true;
        try{
            this.data = await this.service.findAll();
            this.current = this.data[0].id;
            this.loading = false;
        }catch(error){
            this.errorMessage = error;
            this.loading = false;
        }
        this.$scope.$digest();
    }

    setCurrent(item){
        this.current = item.id;
    }

}

export function listingComponent (name) {
    return {

        controller: ($scope, $injector) => {
            return new ListingComponentController($scope, $injector, name)
        },

        get template(){
            return template
        }

    }
}