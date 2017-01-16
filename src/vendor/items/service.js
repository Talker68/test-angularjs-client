let data = [
    {id: 1, name: "the first"},
    {id: 2, name: "the second"}
];

class ServiceParent {

    emulateOfFind(id){
        let d = new this.$q.defer();
        let item = data.filter(item => item.id==id);
        d.resolve(item[0] || null);
        return d.promise;
    }

    emulateOfFindAll(){
        let d = new this.$q.defer();
        d.resolve(data);
        return d.promise;
    }

    emulateOfRemove(id){
        let d = new this.$q.defer();
        data = data.filter(item => item.id!=id);
        d.resolve(data);
        return d.promise;
    }

    async find(id, pageSize, currentPage){
        try{
            let data = await this.emulateOfFind(id);
            return data;
        }catch(e){
            return {
                message: e.data.message
            }
        }
    }

    async findAll(pageSize = 10000, currentPage = 1){
        try{
            let data = await this.emulateOfFindAll();
            return {
                data: data.slice(pageSize*(currentPage - 1), pageSize*currentPage),
                count: data.length
            };
        }catch(e){
            return {
                message: e.data.message
            }
        }
    }

    async remove(id){
        try{
            let result = this.emulateOfRemove(id);
            return result;
        }catch(e){
            return {
                message: e.data.message
            }
        }
    }

}

export class Service extends ServiceParent{

    constructor($injector){
        super();
        this.$injector = $injector;
        this.$q = this.$injector.get('$q');
    }

}