export class ModalPopup{

    constructor(ModalService){
        this.ModalService = ModalService;
    }

    async confirm(title, body){
        let modal = await this.ModalService.showModal({
            template: `<app-modal title="ctrl.title" close="ctrl.close">{{ctrl.body}}</app-modal>`,
            controller: function(close){
                this.title = title;
                this.body = body;
                this.close =  result => close(result, 500)
            },
            controllerAs: 'ctrl'
        });
        modal.element.modal();
        return modal.close;
    }

}