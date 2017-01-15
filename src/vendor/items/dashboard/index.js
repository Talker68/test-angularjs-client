import template from './template.html';
import './styles.less';

export class DashboardComponentController {


    constructor($scope, $injector, name) {

        this.moduleName = name;
        this.$scope = $scope;
        this.$injector = $injector;

        // state
        this.fullscreen = false; // fullscreen mode
        this.current = 2;
        this.sort = {
            name: 'desc' //TODO can be null/'asc'/'desc'
        }

    }
}

export function dashboardComponent(name) {
    return {

        controller: ($scope, $injector) => {
            return new DashboardComponentController($scope, $injector, name)
        },

        get template() {
            return template
        }

    }
}