import PatchBase from '../../../../core/components/miscellaneous/patch/patch.component';
import styleDefault from './patch.style.css';

/**
 * @class Patch
 * @extends {PatchBase}
 */
class Patch extends PatchBase {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-patch', Patch);
