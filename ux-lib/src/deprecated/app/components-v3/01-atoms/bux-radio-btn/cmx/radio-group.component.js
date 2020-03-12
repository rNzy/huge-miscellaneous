import RadioGroup from '../radio-group.component';

import styleDefault from './css/radio-group.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="js-container"><slot></slot></div>';

class CmxRadioGroup extends RadioGroup {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}
customElements.define('bux2-radio-group', CmxRadioGroup);
