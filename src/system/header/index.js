import template from './template.html';
import config from '../../config.json';

export class HeaderComponentController {

    constructor($injector){

        this.$injector = $injector;
        this.$location = $injector.get('$location');

        this.title = config.applicationTitle || '';
        this.menu = config && config.menu || [];

    }

    isActive(item){
        return this.$injector.get('$location').path().split('/')[1] === item.link;
    }

}

export function headerComponent () {
    return {

        controller: HeaderComponentController,

        get template(){
            return template
        }

    }
}