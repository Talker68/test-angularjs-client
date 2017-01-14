import template from './template.html';
import {ModalPopup} from './popup-service';

export class ModalController {

    constructor($scope, $injector){
        this.$scope = $scope;
        this.$injector = $injector;
    }

    close(result){
        this.$scope.close(result);
    }

}

export function modalComponent () {
    return {

        scope: {
            title: '=',
            close: '='
        },

        replace: true,
        transclude: true,

        controller: ModalController,

        get template(){
            return template
        }

    }
};
export {ModalPopup};