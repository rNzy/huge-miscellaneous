import CardSubHeader from '../card-subheader.component';

import styleDefault from './css/card-subheader.style.css';

class AzbCardSubHeader extends CardSubHeader {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-card-subheader', AzbCardSubHeader);
