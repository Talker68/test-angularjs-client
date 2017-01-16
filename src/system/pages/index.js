import template from './template.html';

export class PagesComponentController {

    constructor($injector){
        this.$injector = $injector;
    }

    $onInit(){
        this.pages = [];
        for(let i = 0; i < this.size; i++){
            this.pages.push(i+1);
        }
    }

    set size(value){
        this.$value = value;
        this.$onInit();
    }

    get size(){
        return this.$value;
    }

}

export function pagesComponent () {
    return {

        bindings: {
            size: '=',
            current: '='
        },

        controller: PagesComponentController,

        get template(){
            return template
        }

    }
}