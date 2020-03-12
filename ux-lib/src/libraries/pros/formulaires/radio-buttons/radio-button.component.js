import RadioButtonBase from '../../../../core/components/formulaires/radio-buttons/radio-button.component';

import styleDefault from './radio-button.style.css';

class RadioButton extends RadioButtonBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-radio-button', RadioButton);
