import InputBase from './input.component.js';
import './email.svg';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-input-wrap">
  <input type="email" class="c-input c-input-email js-delegate-focus"><ux-svg icon="email" lib-size="sm"></ux-svg>
</div>
<div style="display:none;" class="a11y-desc a11y-hidden"></div>
<slot class="c-input-error" style="display:none;" name="error"></slot>
`;

/**
 * Composant affichant un champ de type email.
 *
 * @element ux-input-email
 *
 * @slot error
 *
 * @export
 * @class InputMailBase
 * @extends {InputBase}
 */
export default class InputMailBase extends InputBase {
  template() {
    return tpl;
  }
}
