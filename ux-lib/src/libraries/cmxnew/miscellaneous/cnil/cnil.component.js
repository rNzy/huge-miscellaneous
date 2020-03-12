import CnilBase from '../../../../core/components/miscellaneous/cnil/cnil.component';
import styleDefault from './cnil.style.css';

const Base = CnilBase;

/**
 * @class Cnil
 * @extends Base
 * @defines ux-cnil
 */
class Cnil extends Base {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-cnil', Cnil);
