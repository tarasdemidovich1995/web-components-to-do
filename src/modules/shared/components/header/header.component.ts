import { globalEventsService } from './../../services/global-events/global-events.service';
import { BASE_URL } from '../../entities/constants';
import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import { Route } from '../../../../base/route';
import { Subscription } from '../../../../base/subscription';
import './header.styles.scss';
import { Watcher } from '../../../../base/watcher';

export interface AppHeaderProps {
    routes: Route[];
    activeRoute: Route;
}

class AppHeaderComponent extends CustomElement {
    public navElems: HTMLElement[];
    public activeRoute: Route;

    public get url(): string {
        return window.location.hash;
    }

    public init(): void {
        this.props = <AppHeaderProps>{
            routes: JSON.parse(this.getAttribute('routes')),
            activeRoute: JSON.parse(this.getAttribute('activeRoute')),
        };
        this.template = `
            <header class="app-header">
                <div class="app-header__nav">
                    ${this.props.routes.map((route: Route) => `
                        <div class="app-header__nav-elem" data-url="${route.url}">${route.name}</div>
                    `).join('')}
                </div>
                <div class="app-header__controls">
                    <app-theme-select></app-theme-select>
                </div>
            </header>
        `;
    }

    public initHosts(): void {
        this.navElems = Array.from(this.querySelectorAll('.app-header__nav-elem'));
    }

    public initSubscriptions(): void {
        this.subscriptions.push(
            new Subscription<MouseEvent>(this.querySelector('.app-header__nav'), 'click', (event: MouseEvent) => {
                const newUrl: string = (event.target as HTMLElement).dataset?.url;
                if (newUrl && this.activeRoute?.url !== newUrl) {
                    globalEventsService.changeRoute(`${BASE_URL}/${newUrl}`)
                }
            }),
            new Watcher(globalEventsService.$changeRoute, () => {
                this.showActiveLink();
                this.activeRoute = this.props.routes.find((route: Route) => this.url.includes(route.url));
            })
        )
    }

    public showActiveLink(): void {
        this.navElems.forEach((navElem: HTMLElement) => {
            if (this.url.includes(navElem.dataset.url) && !this.url.includes(this.activeRoute?.url)) {
                navElem.classList.add('app-header__nav-elem_active');
            } else {
                navElem.classList.remove('app-header__nav-elem_active');
            }
        })
    }
    
    public connectedCallback(): void {
        super.connectedCallback();
        this.showActiveLink();
    }
}
export const appHeaderComponent: Component = new Component('app-header', AppHeaderComponent);