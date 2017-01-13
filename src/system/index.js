import {headerComponent} from './header';
import {footerComponent} from './footer';

export default function (app){

    app.component(`appHeader`, headerComponent());

    app.component(`appFooter`, footerComponent());

}