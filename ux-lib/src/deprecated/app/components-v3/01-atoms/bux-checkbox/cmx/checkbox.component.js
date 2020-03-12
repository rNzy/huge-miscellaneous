import Checkbox from '../checkbox.component';

import styleDefault from './css/checkbox.style.css';

class CmxCheckbox extends Checkbox {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('bux2-checkbox', CmxCheckbox);
