import {ListingController} from '../../../system/listing';
import template from './template.html';
import './styles.less';

export class ListingComponentController extends ListingController{

    //TODO remove to parent listing
    async loadAll() {
        this.loading = true;
        try {
            let response = await this.service.findAll(this.page.size, this.page.current);
            this.data = response.data;
            this.pagesCount = Math.ceil(response.count/this.page.size);

            //TODO remove when pagination construction
            this.tempPagesArray = [];
            for(let i = 0; i < this.pagesCount; i++){
                this.tempPagesArray.push(i+1);
            }
            this.current = this.current || this.data[0]._id;
        } catch (error) {
            this.error = error;
        } finally{
            this.loading = false;
            this.$scope.$digest();
        }
    }
    // TODO create sortings
    // TODO create show only fields from scope

    constructor($scope, $injector, name) {
        super($scope, $injector, name);
        this.removeFieldName = 'name';
    }

}

export function listingComponent(name) {
    return {

        bindings: {
            current: '=?',
            forRemove: '<?',
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