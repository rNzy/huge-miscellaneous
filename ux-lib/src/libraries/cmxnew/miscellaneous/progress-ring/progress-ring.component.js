import ProgressRingBase from '../../../../core/components/miscellaneous/progress-ring/progress-ring.component';
import styleDefault from './progress-ring.style.css';

const Base = ProgressRingBase;

/**
 * Affiche un anneau de chargement dynamique.
 */
class ProgressRing extends Base {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-progress-ring', ProgressRing);
