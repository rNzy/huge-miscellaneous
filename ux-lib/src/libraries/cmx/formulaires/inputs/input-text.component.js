import InputTextBase from '../../../../core/components/formulaires/inputs/input-text.component.js';
import styleDefault from './input.style.css';

class InputText extends InputTextBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-text', InputText);
