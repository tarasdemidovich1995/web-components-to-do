import { Component } from '../../../../base/component';
import { CustomElement } from '../../../../base/custom-element';
import './footer.styles.scss';

class AppFooterComponent extends CustomElement {
    public init(): void {
        this.template = `
            <footer class="app-footer">
                <div class="app-footer__socials">
                    <div class="app-footer__social-link">
                        <span class="material-icons">phone</span>
                    </div>
                    <div class="app-footer__social-link">
                        <span class="material-icons">email</span>
                    </div>
                    <div class="app-footer__social-link">
                        <span class="material-icons">send</span>
                    </div>
                </div>
                <div class="app-footer__copy">
                    &copy; Copyright all rights reserved 
                </div>
            </footer>
        `;
    }
}
export const appFooterComponent: Component = new Component('app-footer', AppFooterComponent);