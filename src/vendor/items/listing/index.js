import template from './template.html';
import './styles.less';

export class ListingComponentController {

    constructor($scope, $injector, name) {

        this.$scope = $scope;
        this.$injector = $injector;
        this.ModalService = this.$injector.get('ModalService');

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        this.title = name;
        this.data = [];
        this.errorMessage = '';
        this.current = 0;

        this.loadData();

    }

    async loadData() {
        this.loading = true;
        try {
            this.data = await this.service.findAll();
            this.current = this.data[0].id;
            this.loading = false;
        } catch (error) {
            this.errorMessage = error;
            this.loading = false;
        }
        this.$scope.$digest();
    }

    setCurrent(item) {
        this.current = item.id;
    }

    //TODO make as a service
    async showRemoveConfirm(title, body) {
        let modal = await this.ModalService.showModal({
            template: `<app-modal title="controller.title" close="controller.close">{{controller.body}}</app-modal>`,
            controller: function ($scope, close) {
                this.title = title;
                this.body = body;
                this.close = function (result) {
                    close(result, 500);
                };
            },
            controllerAs: "controller"
        });
        modal.element.modal();
        return modal.close;
    }

    async remove(item) {
        item.loading = true;
        try {
            if (await this.showRemoveConfirm("Confirm dialog", "Do you ensure to remove that item?") === 'Yes') {
                let result = await this.service.remove(item.id);
                item.loading = false;
                this.loadData();
            }
        } catch (e) {
            console.log('error', e)
        } finally{
            item.loading = false;
        }
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