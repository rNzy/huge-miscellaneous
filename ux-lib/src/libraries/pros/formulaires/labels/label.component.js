import LabelBase from '../../../../core/components/formulaires/label/label.component.js';
import styleDefault from './label.style.css';

class Label extends LabelBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-label', Label);
