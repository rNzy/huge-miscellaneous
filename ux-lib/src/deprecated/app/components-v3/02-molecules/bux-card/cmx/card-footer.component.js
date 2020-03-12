import CardFooter from '../card-footer.component';

import styleDefault from './css/card-footer.style.css';

class CmxCardFooter extends CardFooter {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-card-footer', CmxCardFooter);
