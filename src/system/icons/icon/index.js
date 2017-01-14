import template from './template.html';

export class IconComponentController {

    constructor($injector){
        this.$injector = $injector;
    }
}

export function iconComponent () {
    return {

        bindings: {
            name: '@',
            title: '@',
            classes: '@'
        },

        controller: IconComponentController,

        get template(){
            return template
        }

    }
}