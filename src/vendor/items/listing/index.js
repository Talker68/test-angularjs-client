import {ListingController} from '../../../system/listing';
import template from './template.html';
import './styles.less';

export class ListingComponentController extends ListingController{

    constructor($scope, $injector, name) {
        super($scope, $injector, name);
        this.removeFieldName = 'name';
    }

}

export function listingComponent(name) {
    return {

        bindings: {
            current: '=?',
            forRemove: '=?',
            page: '=?',
            sort: '=?'
        },

        controller: ($scope, $injector) => {
            return new ListingComponentController($scope, $injector, name)
        },

        get template() {
            return template
        }

    }
}