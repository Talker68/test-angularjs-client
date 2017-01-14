import {headerComponent} from './header';
import {footerComponent} from './footer';
import {loaderComponent} from './loader';
import {iconComponent, iconToggleComponent} from './icons';
import {modalComponent, ModalPopup} from './modal';

export default function (app){

    app.component(`appHeader`, headerComponent());

    app.component(`appFooter`, footerComponent());

    app.component(`appLoader`, loaderComponent());

    app.component(`appIcon`, iconComponent());
    app.component(`appIconToggle`, iconToggleComponent());

    app.directive(`appModal`, () => modalComponent());
    app.service(`ModalPopup`, ['ModalService',(ModalService) => new ModalPopup(ModalService)]);

}