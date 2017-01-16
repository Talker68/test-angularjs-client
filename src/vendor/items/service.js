let data = [
    {_id: 1, name: "B, the first"},
    {_id: 2, name: "A, the second"},
    {_id: 3, name: "C, the third"},
    {_id: 4, name: "D, the forth"},
    {_id: 5, name: "E, the fifth"},
    {_id: 6, name: "F, the sixth"},
    {_id: 7, name: "G, the seventh"},
    {_id: 8, name: "H, the eighth"},
    {_id: 9, name: "I, the ninth"},
    {_id: 10, name: "J, the tenth"},
    {_id: 11, name: "K, the eleventh"}
];

class ServiceParent {

    emulateOfFind(id){
        let d = new this.$q.defer();
        let item = data.filter(item => item._id==id);
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
        data = data.filter(item => item._id!=id);
        d.resolve(data);
        return d.promise;
    }

    async find(id){
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