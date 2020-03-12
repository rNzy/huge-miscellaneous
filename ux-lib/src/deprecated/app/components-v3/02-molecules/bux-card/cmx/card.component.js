import Card from '../card.component';

import styleDefault from './css/card.style.css';

class CmxCard extends Card {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-card', CmxCard);
