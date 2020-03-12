import InputItemBase from '../../../../core/components/formulaires/inputs/input-item.component';
import styleDefault from './input-item.style.css';

class InputItem extends InputItemBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-item', InputItem);
