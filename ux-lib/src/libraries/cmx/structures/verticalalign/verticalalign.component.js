import VerticalAlignBase from '../../../../core/components/structures/verticalalign/verticalalign.component';
import styleDefault from './verticalalign.style.css';

/**
 * This is a simple text
 */
class VerticalAlign extends VerticalAlignBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-verticalalign', VerticalAlign);
