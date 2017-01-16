import {Controller} from '../../../system/dashboard';
import template from './template.html';
import './styles.less';

export class DashboardComponentController extends Controller{

    add($event){
        $event.stopPropagation();
        this.$location.path(`/${this.moduleName}/add`);
    }

    restoreState(){
        super.restoreState();
        // TODO get from storage
        this.fullscreen = false;
        // for listing
        this.page = {
            size: 5, // items on a page
            current: 1 // active page
        };
        this.current = 2; // selected item
        this.fields = ['name']; // fields to show
        this.sort = { // fields to sort
            name: 'desc'
        };
    }


    constructor($scope, $injector, name) {

        super($scope, $injector, name);
        this.$location = $injector.get('$location');

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