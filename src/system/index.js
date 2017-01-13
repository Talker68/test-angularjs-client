import {headerComponent} from './header';
import {footerComponent} from './footer';
import {modalComponent} from './modal';

export default function (app){

    app.component(`appHeader`, headerComponent());

    app.component(`appFooter`, footerComponent());

    app.directive(`appModal`, () => modalComponent());

}