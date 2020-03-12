import MenuIconBase from '../../../../core/components/navigations/menu/menu-icon.component';
import styleDefault from './login.style.css';
/**
 * @class Login
 * @extends {MenuIconBase}
 *
 */

class Login extends MenuIconBase {
  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) {
      this.setAttribute('slot', 'right');
    }
    this.container.title = 'Déconnexion';
    this.container.setAttribute('aria-label', 'se déconnecter');
    this.iconEl.setAttribute('icon', 'connexion');
    this.iconEl.setAttribute('lib-size', 'xl');
  }
}

customElements.define('ux-login', Login);