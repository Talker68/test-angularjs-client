import './styles.less';

export class DashboardController {

    constructor($scope, $injector, name){

        this.$scope = $scope;
        this.$injector = $injector;
        this.moduleName = name;
        this.$scope.$on('$destroy', () => this.$onDestroy.bind(this));

    }

    restoreState(){
        // TODO get from storage
    }

    saveState(){
        // TODO set to storage
    }

    $onInit(){
        this.restoreState();
    }

    $onDestroy(){
        this.saveState();
    }

}