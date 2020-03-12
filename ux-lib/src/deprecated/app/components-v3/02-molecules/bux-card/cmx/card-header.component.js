import CardHeader from '../card-header.component';

import styleDefault from './css/card-header.style.css';

class CmxCardHeader extends CardHeader {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-card-header', CmxCardHeader);