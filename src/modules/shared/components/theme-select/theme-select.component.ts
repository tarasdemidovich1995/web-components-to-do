import { globalEventsService } from './../../services/global-events/global-events.service';
import { AppThemes } from '../../entities/app-themes';
import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { Subscription } from '../../../../base/subscription';
import { App } from '../../../../app';
import './theme-select.styles.scss';


export class ThemeSelectComponent extends CustomElement {
    public init(): void {
        this.template = `
            <div class="theme-select-container">
                <span class="material-icons">light_mode</span>
                <div class="theme-select">
                    <div class="theme-select__pointer"></div>
                </div>
                <span class="material-icons">nightlight_round</span>
            </div>
        `;
    }

    public initSubscriptions(): void {
        this.subscriptions.push(new Subscription(this.querySelector('.theme-select'), 'click', () => {
            globalEventsService.changeTheme(App.theme === AppThemes.White ? AppThemes.Dark : AppThemes.White);
        }))
    }
}
export const themeSelectComponent: Component = new Component('app-theme-select', ThemeSelectComponent);