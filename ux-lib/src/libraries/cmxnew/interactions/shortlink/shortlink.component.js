import ShortlinkBase from '../../../../core/components/interactions/shortlink/shortlink.component';

import styleDefault from './shortlink.style.css';

/**
 * Permet de créer un élément qui sert de raccourci avec un label
 * une icone et un lien.
 */
class Shortlink extends ShortlinkBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-shortlink', Shortlink);
