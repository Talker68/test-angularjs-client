export class Service {

    constructor($injector){
        this.$injector = $injector;
    }

    findAll(){
        return new Promise((resolve, reject)=>{
            resolve([1, 2, 3]);
        });
    }

}