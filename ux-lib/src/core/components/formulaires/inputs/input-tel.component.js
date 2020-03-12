import InputBase from './input.component.js';
import './telephone-fixe.svg';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-input-wrap">
  <input type="tel" class="c-input c-input-tel js-delegate-focus"><ux-svg class="c-input-tel--svg" icon="telephone-fixe" lib-size="sm"></ux-svg>
</div>
<div style="display:none;" class="a11y-desc a11y-hidden"></div>
<slot class="c-input-error" style="display:none;" name="error"></slot>
`;

/**
 * Composant affichant un champ de type tel.
 *
 * @element ux-input-tel
 *
 * @slot error
 *
 * @export
 * @class InputTelBase
 * @extends {InputBase}
 */
export default class InputTelBase extends InputBase {
  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'value') {
      if (this.formItSelf) {
        this.formItSelf = false;
      } else {
        this.setValue(this.value);
      }
    }
  }

  setValue(val) {
    this.formItSelf = true;

    if (val === null || typeof val === 'undefined') {
      clearInput(this);
      return;
    }

    if (this.input.type === 'tel') {
      this._setValueForTel(val);
    } else {
      // Inject to input
      this.input.value = val;
      this.value = val;
    }
  }

  _setValueForTel(val) {
    /**
     * Permet de gérer l'affichage d'un numéro de téléphone avec un format spécifique : <input type="tel">
     * Devrait être surchargé par un composant générique de gestion des formats de numéro de téléphone
     */
    let newValue = '';

    // If value is not null

    // Remove everything that's not a number
    newValue = val.replace(/[^0-9]/g, '');

    // Limit size to 19 characters
    newValue = newValue.substring(0, 19);

    // Add space every two characters (french phone number visibility)
    newValue = newValue.replace(/(\d{2})/g, '$1 ').replace(/(^\s+|\s+$)/, '');

    // Inject to input
    this.input.value = newValue;
  }
}

function clearInput(self) {
  self.input.classList.add('c-input-noval');
  self.value = '';
  self.input.value = '';
}
