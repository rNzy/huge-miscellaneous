import InputBase from './input.component.js';
import './eye.svg';
import './eye-blocked.svg';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-input-wrap">
  <input type="password" class="c-input c-input-password js-delegate-focus">
  <ux-btn lib-title="Afficher le mot de passe" id="showhide" model="nostyle"><ux-svg icon="eye" lib-size="md"></ux-svg></ux-btn>
</div>
<div style="display:none;" class="a11y-desc a11y-hidden"></div>
<slot class="c-input-error" style="display:none;" name="error"></slot>
`;

/**
 * Composant affichant un champ de type password.
 *
 * @element ux-input-password
 *
 * @slot error
 *
 * @export
 * @class InputPasswordBase
 * @extends {InputBase}
 */
export default class InputPasswordBase extends InputBase {
  constructor() {
    super();
    this._togglePassword = this._togglePassword.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.$.querySelector('#showhide').addEventListener(
      'click',
      this._togglePassword
    );
  }

  _togglePassword() {
    const svg = this.$.querySelector('ux-svg');
    const eyeBtn = this.$.querySelector('#showhide');
    const inputState = this.input.getAttribute('type');

    if (inputState === 'password') {
      this.input.setAttribute('type', 'text');
      svg.setAttribute('icon', 'eye-blocked');
      eyeBtn.setAttribute('lib-title', 'Masquer le mot de passe');
    } else {
      this.input.setAttribute('type', 'password');
      svg.setAttribute('icon', 'eye');
      eyeBtn.setAttribute('lib-title', 'Afficher le mot de passe');
    }
  }

  template() {
    return tpl;
  }
}
