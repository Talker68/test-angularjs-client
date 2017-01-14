import template from './template.html';
import './styles.less';

export class ItemComponentController {

    constructor($scope, $injector, name) {

        this.$scope = $scope;
        this.$injector = $injector;

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        //this.loading = true;

    }

}

export function itemComponent(name) {
    return {

        bindings: {
            id: '@'
        },

        controller: ($scope, $injector) => {
            return new ItemComponentController($scope, $injector, name)
        },

        get template() {
            return template
        }

    }
}