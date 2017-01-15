import template from './template.html';
import './styles.less';

export class ItemComponentController {

    async find(){
        this.loading = true;
        try{
            let data = await this.service.find(this.id);
            this.data = data;
        }catch(e){
            this.error = e;
        }finally{
            this.loading = false;
            this.$scope.$digest();
        }
    }

    edit(event){
        event.stopPropagation();
        this.$location.path(`/${this.moduleName}/edit/${this.id}`)
    }

    back(url, event){
        event.stopPropagation();
        url && this.$location.path(url);
    }

    set id(value){
        this.$value = +value;
        if(this.$value){
            this.find();
        }
    }

    get id(){
        return this.$value;
    }

    constructor($scope, $injector, name) {

        this.moduleName = name;
        this.$scope = $scope;
        this.$injector = $injector;
        this.$location = $injector.get('$location');

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);
        this.data = null;

    }

}

export function itemComponent(name) {
    return {

        bindings: {
            id: '@',
            backUrl: '@',
            classes: '@'
        },

        controller: ($scope, $injector) => {
            return new ItemComponentController($scope, $injector, name)
        },

        get template() {
            return template
        }

    }
}