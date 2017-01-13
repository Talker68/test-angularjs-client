let data = [
    {id: 1, name: "the first"},
    {id: 2, name: "the second"}
];

class ServiceParent {

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

    async findAll(){
        try{
            let data = await this.emulateOfFindAll();
            return data;
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