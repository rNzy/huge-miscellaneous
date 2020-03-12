import InputBase from './input.component.js';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-input-wrap">
  <input type="text" class="c-input c-input-text js-delegate-focus">
</div>
<div style="display:none;" class="a11y-desc a11y-hidden"></div>
<slot class="c-input-error" style="display:none;" name="error"></slot>
`;

/**
 * Composant affichant un champ de type text.
 *
 * @element ux-input-text
 *
 * @slot error
 *
 * @export
 * @class InputTextBase
 * @extends {InputBase}
 */
export default class InputTextBase extends InputBase {
  template() {
    return tpl;
  }
}
