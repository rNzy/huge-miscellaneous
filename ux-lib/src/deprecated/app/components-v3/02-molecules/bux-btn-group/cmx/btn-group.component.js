import BtnGroup from '../btn-group.component';

import styleDefault from './css/btn-group.style.css';

class CmxBtnGroup extends BtnGroup {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-btn-group', CmxBtnGroup);
