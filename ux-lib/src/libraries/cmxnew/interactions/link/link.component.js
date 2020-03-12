import LinkBase from '../../../../core/components/interactions/link/link.component';

import styleDefault from './link.style.css';

/**
 * Permet de créer un lien.
 */
class Link extends LinkBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-link', Link);
