import { Observer } from '../../../../base/observer';
import { AppThemes } from './../../entities/app-themes';

class GlobalEventsService {
    public $changeTheme: Observer = new Observer();
    public $changeRoute: Observer = new Observer();

    public changeTheme(theme: AppThemes): void {
        this.$changeTheme.broadcast(theme);
    }

    public changeRoute(url: string): void {
        window.history.pushState({}, url, window.location.origin + url);
        this.$changeRoute.broadcast();
    }
}

export const globalEventsService: GlobalEventsService = new GlobalEventsService();