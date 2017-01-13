class ServiceParent {

    emulateOfRequest(){
        let d = new this.$q.defer();
        d.resolve([
            {id: 1, name: "the first"},
            {id: 2, name: "the second"}
        ]);
        return d.promise;
    }

    async findAll(){
        try{
            let data = await this.emulateOfRequest();
            return data;
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