import { createModule } from './modules/create/create.module';
import { globalEventsService } from './modules/shared/services/global-events/global-events.service';
import { dashboardModule } from './modules/dashboard/dashboard.module';
import { AppThemes } from './modules/shared/entities/app-themes';
import { appRoutes } from './base/route';
import { sharedModule } from './modules/shared/shared.module';
import './app.scss';

export class App {
    public static body: HTMLBodyElement = document.querySelector('body');
    public static theme: AppThemes;

    public static async initialize(): Promise<void> {
        sharedModule.defineComponents();
        dashboardModule.defineComponents();
        createModule.defineComponents();
        await Promise.all([
            sharedModule.whenComponentsDefined(),
            dashboardModule.whenComponentsDefined(),
            createModule.whenComponentsDefined(),
        ]);
    }

    public static render(): void {
        App.setTheme(AppThemes.White);
        App.body.innerHTML = `
            <div class="app">
                <app-header routes='${JSON.stringify(appRoutes)}'></app-header>
                <main class="app__content">
                    <app-router>
                        <template data-url="dashboard" data-redirect="true">
                            <to-do-list></to-do-list>
                        </template>
                        <template data-url="create">
                            <create-to-do></create-to-do>
                        </template>
                        <template data-url="edit">
                            <update-to-do></update-to-do>
                        </template>
                    </app-router>
                </main>
                <app-footer></app-footer>
            </div>
        `;
    }
    
    public static initGlobalEventHandlers(): void {
        globalEventsService.$changeTheme.subscribe((theme: AppThemes) => App.setTheme(theme));
    }

    public static setTheme(theme: AppThemes): void {
        App.theme = theme;
        App.body.setAttribute('data-theme', App.theme);
    }


    public static start(): void {
        App.render();
        App.initGlobalEventHandlers();
    }
}
