import CheckboxGroup from '../checkbox-group.component';

import styleDefault from './css/checkbox-group.style.css';

class CmxCheckboxGroup extends CheckboxGroup {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('bux2-checkbox-group', CmxCheckboxGroup);
