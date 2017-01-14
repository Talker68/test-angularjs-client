import template from './template.html';
import './styles.less';

export class ListingComponentController {

    async loadAll() {
        this.loading = true;
        try {
            this.data = await this.service.findAll();
            this.current = this.data[0].id;
        } catch (error) {
            this.error = error;
        } finally{
            this.loading = false;
            this.$scope.$digest();
        }
    }

    async remove(item) {
        item.loading = true;
        try {
            if (await this.ModalPopup.confirm("Confirm dialog", "Do you ensure to remove that item?") === 'Yes') {
                let result = await this.service.remove(item.id);
                item.loading = false;
                this.loadAll();
            }
        } catch (e) {
            console.log('error', e)
        } finally{
            item.loading = false;
        }
    }

    constructor($scope, $injector, name) {

        this.$scope = $scope;
        this.$injector = $injector;
        this.ModalPopup = this.$injector.get('ModalPopup');

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        this.title = name;
        this.data = [];
        this.error = '';
        this.current = 0;

        this.loadAll();

        this.fullscreen = false; // fullscreen mode

    }

    setCurrent(item) {
        this.current = item.id;
    }

}

export function listingComponent(name) {
    return {

        controller: ($scope, $injector) => {
            return new ListingComponentController($scope, $injector, name)
        },

        get template() {
            return template
        }

    }
}