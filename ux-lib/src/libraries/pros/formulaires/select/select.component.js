import SelectBase from '../../../../core/components/formulaires/select/select.component';
import styleDefault from './select.style.css';

class Select extends SelectBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-select', Select);
