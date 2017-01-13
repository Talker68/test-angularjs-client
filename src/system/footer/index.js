import template from './template.html';
import config from '../../config.json';

export class FooterComponentController {

    constructor($injector){

        this.$injector = $injector;

    }
}

export function footerComponent () {
    return {

        controller: FooterComponentController,

        get template(){
            return template
        }

    }
}