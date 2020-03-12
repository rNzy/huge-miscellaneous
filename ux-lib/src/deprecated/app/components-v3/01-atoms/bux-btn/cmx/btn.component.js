import Btn from '../btn.component';

import styleDefault from './css/btn.style.css';

class CmxBtn extends Btn {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-btn', CmxBtn);
