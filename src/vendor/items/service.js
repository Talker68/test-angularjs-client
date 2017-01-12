export class Service {

    constructor($injector){
        this.$injector = $injector;
        this.$q = this.$injector.get('$q');
    }

    findAll(){
        let d = new this.$q.defer();
        d.resolve([
            {id: 1, name: "the first"},
            {id: 2, name: "the second"}
        ]);
        return d.promise;
    }

}