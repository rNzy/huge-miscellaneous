import MenuIconBase from '../../../../core/components/navigations/menu/menu-icon.component';
import NotificationMixin from '../../../../core/mixins/dom/notification/notification.component';

const Base = NotificationMixin(MenuIconBase);

import styleDefault from './messagerie.style.css';
/**
 * @class Messagerie
 * @extends {MenuIconBase}
 *
 */

class Messagerie extends Base {
  constructor() {
    super();
  }
  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) {
      this.setAttribute('slot', 'right');
    }
    this.container.title = 'Mon conseiller, ma messagerie';
    this.container.setAttribute(
      'aria-label',
      'Mon conseiller : Messagerie, contacts, prise de rendez-vous'
    );
    this.iconEl.setAttribute('icon', 'conseiller');
    this.iconEl.setAttribute('lib-size', 'xl');
  }
}

customElements.define('ux-messagerie', Messagerie);
