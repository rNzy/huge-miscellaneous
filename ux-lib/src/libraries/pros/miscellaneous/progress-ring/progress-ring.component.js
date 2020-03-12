import ProgressRingBase from '../../../../core/components/miscellaneous/progress-ring/progress-ring.component';
import styleDefault from './progress-ring.style.css';

const Base = ProgressRingBase;

/**
 * @class ProgressRing
 * @extends Base
 * @defines ux-progress-ring
 */
class ProgressRing extends Base {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-progress-ring', ProgressRing);
