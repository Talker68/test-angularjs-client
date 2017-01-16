import {headerComponent} from './header';
import {footerComponent} from './footer';
import {loaderComponent} from './loader';
import {errorComponent} from './messages';
import {iconComponent, iconToggleComponent} from './icons';
import {modalComponent, ModalPopup} from './modal';
import {pagesComponent} from './pages';

export default function (app){

    app.component(`appHeader`, headerComponent());

    app.component(`appFooter`, footerComponent());

    app.component(`appLoader`, loaderComponent());

    app.component(`appError`, errorComponent());

    app.component(`appPages`, pagesComponent());

    app.component(`appIcon`, iconComponent());
    app.component(`appIconToggle`, iconToggleComponent());

    app.directive(`appModal`, () => modalComponent());
    app.service(`ModalPopup`, ['ModalService',(ModalService) => new ModalPopup(ModalService)]);

}