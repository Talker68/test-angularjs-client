import {Controller} from '../dashboard';
import './styles.less';

export class ListingController extends Controller {

    get forRemove() {
        return this.$value;
    }

    set forRemove(value) {
        this.$value = value;
        this.remove(this.$value);
    }

    async restoreState() {
        this.page = this.page || {
                size: 10,
                current: 1
            };
        try {
            let loaded = await this.loadAll();
            this.forRemove = this.forRemove;
        } catch (e) {

        } finally {
            this.$scope.$digest();
        }
    }

    view(item, event) {
        event.stopPropagation();
        this.$location.path(`/${this.moduleName}/${item._id}`)
    }

    edit(item, event) {
        event.stopPropagation();
        this.$location.path(`/${this.moduleName}/edit/${item._id}`)
    }

    async remove(id) {
        if(id && this.data && this.data.length){
            let items = this.data.filter(v => {
                return v._id == id;
            });
            if(items && items[0]){
                let item = items[0];
                item.loading = true;
                try {
                    if (await this.ModalPopup.confirm("Confirm", `Do you ensure to remove that item: ${this.currentItem[this.removeFieldName]}?`) === 'Yes') {
                        let result = await this.service.remove(item._id);
                        this.loadAll();
                    }
                } catch (e) {
                    console.log('error', e)
                } finally{
                    item.loading = false;
                    this.$scope.$digest();
                    this.current = this.current == item._id ? 0 : this.current;
                }
            }
        }
    }

    setCurrent(item) {
        this.current = item._id;
    }

    get currentItem() {
        let item = {};
        if (this.data.length) {
            let i = this.data.filter(v => v._id == this.current);
            if (i.length) {
                item = i[0];
            }
        }
        return item;
    }

    setCurrentPage(num){
        if(num < 1 || num > this.pagesCount) return;
        this.page.current = num;
        this.loadAll();
    }

    constructor($scope, $injector, name) {
        super($scope, $injector, name);

        this.$location = $injector.get('$location');
        this.ModalPopup = this.$injector.get('ModalPopup');

        name = name[0].toUpperCase() + name.slice(1);
        this.service = this.$injector.get(`${name}Service`);

        this.title = name;
        this.data = [];
        this.error = '';
        this.removeFieldName = '';

    }


}