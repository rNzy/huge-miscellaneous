import InputTelBase from '../../../../core/components/formulaires/inputs/input-tel.component.js';
import styleDefault from './input.style.css';

class InputTel extends InputTelBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-tel', InputTel);
