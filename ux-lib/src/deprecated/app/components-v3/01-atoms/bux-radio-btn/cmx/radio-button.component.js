import RadioButton from '../radio-button.component';

import styleDefault from './css/radio-button.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<slot></slot>';

class CmxRadioButton extends RadioButton {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}

customElements.define('bux2-radio-button', CmxRadioButton);
