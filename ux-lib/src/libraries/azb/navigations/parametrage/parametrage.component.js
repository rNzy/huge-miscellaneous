import MenuIconBase from '../../../../core/components/navigations/menu/menu-icon.component';
import styleDefault from './parametrage.style.css';
/**
 * @class Parametrage
 * @extends {MenuIconBase}
 *
 * @slot - default
 */

class Parametrage extends MenuIconBase {
  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) {
      this.setAttribute('slot', 'right');
    }
    this.container.title = 'Paramétrage';
    this.container.setAttribute(
      'aria-label',
      'Paramétrage. Gérer ma sécurité bancaire, mes alertes'
    );
    this.iconEl.setAttribute('icon', 'engrenage');
    this.iconEl.setAttribute('lib-size', 'xl');
  }
}

customElements.define('ux-parametrage', Parametrage);
