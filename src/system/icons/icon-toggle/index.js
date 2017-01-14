import template from './template.html';

export class IconToggleComponentController {

    constructor($injector){
        this.$injector = $injector;
    }

}

export function iconToggleComponent () {
    return {

        bindings: {
            model: '=',
            classTrue: '@',
            classFalse: '@',
            classes: '@'
        },

        controller: IconToggleComponentController,

        get template(){
            return template
        }

    }
}