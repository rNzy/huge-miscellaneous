import CardBody from '../card-body.component';

import styleDefault from './css/card-body.style.css';

class CmxCardBody extends CardBody {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-card-body', CmxCardBody);
