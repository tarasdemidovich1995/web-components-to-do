import { notificationComponent } from './components/notification/notification.component';
import { Module } from '../../base/module';
import { appFooterComponent } from './components/footer/footer.component';
import { appHeaderComponent } from './components/header/header.component';
import { routerComponent } from './components/router/router.component';
import { themeSelectComponent } from './components/theme-select/theme-select.component';

export const sharedModule: Module = new Module([
    appHeaderComponent,
    appFooterComponent,
    themeSelectComponent,
    routerComponent,
    notificationComponent,
]);
