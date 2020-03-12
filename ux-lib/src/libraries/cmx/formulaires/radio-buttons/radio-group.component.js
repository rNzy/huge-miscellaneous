import RadioGroupBase from '../../../../core/components/formulaires/radio-buttons/radio-group.component';

import styleDefault from './radio-group.style.css';

class RadioGroup extends RadioGroupBase {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-radio-group', RadioGroup);
