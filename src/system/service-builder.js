export class ServiceBuilder {

    static create(app, name, Class) {
        name = name[0].toUpperCase() + name.slice(1);
        app.service(`${name}Service`, ['$injector', ($injector) => new Class($injector)])
    }

}