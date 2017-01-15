import template from './template.html';
import './styles.less';

export class ListingComponentController {

    restoreState(){
        this.forRemove = this.forRemove;
    }

    async loadAll() {
        this.loading = true;
        try {
            this.data = await this.service.findAll();
            this.current = this.current || this.data[0].id;
            this.restoreState();
        } catch (error) {
            this.error = error;
        } finally{
            this.loading = false;
            this.$scope.$digest();
        }
    }

    get forRemove(){
        return this.$value;
    }

    set forRemove(value){
        this.$value = value;
        if(this.$value && this.data && this.data.length){
            let items = this.data.filter(v => {
                return v.id == this.$value
            });
            if(items && items[0]){
                let item = items[0];
                item.loading = true;
                this.remove(item.id).then(()=>{
                    item.loading = false;
                }).catch(()=>{
                    item.loading = false;
                });
            }
        }
    }


    async remove(id) {
        try {
            if (await this.ModalPopup.confirm("Confirm", `Do you ensure to remove that item: ${this.currentItem.name}?`) === 'Yes') {
                let result = await this.service.remove(id);
                this.loadAll();
            }
        } catch (e) {
            console.log('error', e)
        } finally{
            this.$scope.$digest();
        }
    }

    get currentItem(){
        let item = {};
        if(this.data.length){
            let i = this.data.filter(v => v.id == this.current);
            if(i.length){
                item = i[0];
            }
        }
        return item;
    }

    edit(item, event){
        event.stopPropagation();
        this.$location.path(`/${this.moduleName}/edit/${item.id}`)
    }

    view(item, event){
        event.stopPropagation();
        this.$location.path(`/${this.moduleName}/${item.id}`)
    }

    constructor($scope, $injector, name) {

        this.moduleName = name;
        this.$scope = $scope;
        this.$injector = $injector;
        this.$location = $injector.get('$location');
        this.ModalPopup = this.$injector.get('ModalPopup');

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        this.title = name;
        this.data = [];
        this.error = '';

        this.loadAll();

        this.fullscreen = false; // fullscreen mode

    }

    setCurrent(item) {
        this.current = item.id;
    }

}

export function listingComponent(name) {
    return {

        bindings: {
            current: '=?'
        },

        controller: ($scope, $injector) => {
            return new ListingComponentController($scope, $injector, name)
        },

        get template() {
            return template
        }

    }
}