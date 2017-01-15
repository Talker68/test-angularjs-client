import template from './template.html';

export class ErrorComponentController {

    constructor($injector) {
        this.$injector = $injector;
    }
}

export function errorComponent() {

    return {

        replace: true,
        transclude: true,

        controller: ErrorComponentController,

        get template() {
            return template
        }

    }
}