import {Controller} from '../dashboard';
import './styles.less';

let $pageCurrent = 0;
let $forRemove = 0;

export class ListingController extends Controller {

    set pageCurrent(value){
        $pageCurrent && $pageCurrent != value && this.loadAll($pageCurrent = value) || ($pageCurrent = value);
    }

    get pageCurrent(){
        return $pageCurrent;
    }

    get forRemove() {
        return $forRemove;
    }

    set forRemove(value) {
        $forRemove = value;
        this.remove(value);
    }
    //
    async loadAll(page) {
        this.loading = true;
        try {
            let response = await this.service.findAll(this.pageSize, page);
            this.data = response.data;
            this.pagesCount = Math.ceil(response.count/this.pageSize);
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
                    if (await this.ModalPopup.confirm("Confirm", `Do you ensure to remove that item: ${item[this.removeFieldName]}?`) === 'Yes') {
                        let result = await this.service.remove(item._id);
                        this.loadAll(this.pageCurrent);
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
        this.pageCurrent = num;
        this.loadAll(this.pageCurrent);
    }

    async restoreState() {
        this.pageSize = this.page && this.page.size || 10;
        this.pageCurrent =  this.page && this.page.current || 1;
        try {
            let loaded = await this.loadAll(this.pageCurrent);
            this.forRemove = this.forRemove;
        } catch (e) {

        } finally {
            this.$scope.$digest();
        }
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