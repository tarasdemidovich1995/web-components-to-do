import { App } from './app';
import './styles/index.scss';

(async function(): Promise<void> {
    await App.initialize();
    App.start();
})();