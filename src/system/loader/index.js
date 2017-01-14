import './styles.less';

export class LoaderComponentController {

    constructor($injector){
        this.$injector = $injector;
    }
}

export function loaderComponent () {
    return {

        controller: LoaderComponentController,

        get template(){
            return `<div class="loader center-block"></div>`;
        }

    }
}