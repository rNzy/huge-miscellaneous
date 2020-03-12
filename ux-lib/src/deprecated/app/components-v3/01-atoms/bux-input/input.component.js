import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import AriaDelegateFocus from '../../../mixins/aria/delegateFocus.mixin';
import FineSlotChange from '../../../mixins/dom/fineslotchange.mixin';
import Hidden from '../../../mixins/aria/hidden-style.mixin';

const Base = Hidden(FineSlotChange(AriaDelegateFocus(BaseShadowComponent)));

import styleDefault from './input.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div id="wrap">
  <div id="icon-left"><slot name="icon-left"></slot></div>
  <input id="input" type="text" class="c-input-noval js-delegate-focus"></input>
  <div id="icon-right"><slot name="icon-right"></slot></div>
</div>
<div style="display:none;" class="a11y-desc a11y-hidden"></div>
<slot class="c-input-error" id="error" style="display:none;" name="error"></slot>
`;

let count = 0;

export default class Input extends Base {
  static get properties() {
    return {
      required: { type: 'boolean' },
      type: { type: 'string' },
      state: { type: 'string' },
      placeholder: { type: 'string' },
      min: { type: 'number' },
      max: { type: 'number' },
      value: { type: 'string' },
      round: { type: 'number' },
      maxlength: { type: 'number' },
      minlength: { type: 'number' },
      a11ylabel: { type: 'string' },
      autocomplete: { type: 'string' },
      reset: { type: 'boolean' },
      noCopyPaste: { type: 'boolean' },
      disabled: { type: 'boolean' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.input = this.$.querySelector('#input');
    this.errorSlot = this.$.querySelector('.c-input-error');

    this.setValueListener = this.setValueListener.bind(this);
    this.dispatchListener = this.dispatchListener.bind(this);
    this.resetInputOnClick = this.resetInputOnClick.bind(this);
    this.displayInputReset = this.displayInputReset.bind(this);
    this.setClassFromIco = this.setClassFromIco.bind(this);
    this.a11yEl = this.$.querySelector('.a11y-desc');

    this.slotLeft = this.$.querySelector('#icon-left slot');
    this.slotRight = this.$.querySelector('#icon-right slot');

    this.fineSlotChange(this.slotLeft, this.setClassFromIco);
    this.fineSlotChange(this.slotRight, this.setClassFromIco);
  }

  setResetBtn() {
    // Crée un bouton reset dans la <div id="wrap">
    this.resetBtn = document.createElement('button');
    this.resetBtn.classList.add('c-reset-btn');
    this.resetBtn.style.display = 'none';
    this.resetBtn.innerHTML =
      '<bux2-svg icon="cross" size="xs" aria-hidden="true"></bux2-svg>';
    this.resetBtn.setAttribute(
      'aria-label',
      'Effacer la saisie du champ de recherche'
    );
    this.$.querySelector('#wrap').appendChild(this.resetBtn);
  }
  resetInputOnClick() {
    this.input.value = '';
    this.input.focus();
    this.resetBtn.style.display = 'none';
    this.dispatchEvent(new Event('clear'));
  }
  displayInputReset() {
    if (this.value.length) {
      this.resetBtn.style.display = 'block';
    } else {
      this.resetBtn.style.display = 'none';
    }
  }

  setValueListener(e) {
    // Ces lignes servent à remettre le curseur à la bonne position
    // dans l'input quand l'utilisateur corrige la valeur
    const oldLength = this.input.value.length;
    let cursorPosition = 0;
    if (this.input.type != 'range') cursorPosition = this.input.selectionStart;

    // Formate bien la valeur
    this.setValue(e.target.value);
    this.dispatchEvent(new Event('change'));

    // remettre le curseur à la bonne position
    if (this.input.type != 'range') {
      if (this.input.value.length > oldLength) {
        cursorPosition++;
      }
      this.input.selectionStart = cursorPosition;
      this.input.selectionEnd = cursorPosition;
    }
  }

  dispatchListener() {
    this.dispatchEvent(new Event('focus'));
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;

    if (super.connectedCallback) super.connectedCallback();

    // Met des classes à l'input si celui-ci a une icone
    this.setClassFromIco();

    if (!this.type) this.type = 'text';

    this.input.addEventListener('input', this.setValueListener);
    this.input.addEventListener('focus', this.dispatchListener);

    // Affiche / masque le bouton reset si la value de l'input est non nulle ou si l'on clique sur le bouton reset
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', this.resetInputOnClick);
      this.input.addEventListener('input', this.displayInputReset);
    }

    this.setRequired();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.input.removeEventListener('input', this.setValueListener);
    this.input.removeEventListener('focus', this.dispatchListener);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'required':
        this.setRequired();
        break;
      case 'state':
        this.setClassFromState();
        this.setLabelState();
        break;
      case 'type':
        this.input.classList.add(`c-input-${this.type}`);
        if (this.type !== 'number') {
          this.input.type = this.type;
        }
        break;
      case 'placeholder':
        if (this.placeholder) {
          this.input.setAttribute('placeholder', this.placeholder);
        } else {
          this.input.removeAttribute('placeholder');
        }
        break;
      case 'value':
        if (this.formItSelf) {
          this.formItSelf = false;
        } else {
          this.setValue(this.value);
        }
        break;
      case 'maxlength':
        this.input.setAttribute('maxlength', this.maxlength);
        break;
      case 'minlength':
        this.input.setAttribute('minlength', this.minlength);
        break;
      case 'a11ylabel':
        this.input.setAttribute('aria-label', this.a11ylabel);
        break;
      case 'autocomplete':
        this.input.setAttribute('autocomplete', this.autocomplete);
        break;
      case 'reset':
        this.setResetBtn();
        break;
      case 'no-copy-paste':
        this.preventCopyPaste();
        break;
      case 'disabled':
        this.disabled
          ? this.input.setAttribute('disabled')
          : this.input.removeAttribute('disabled');
        break;
    }
  }

  preventCopyPaste() {
    if (this.noCopyPaste) {
      this.input.oncopy = () => false;
      this.input.onpaste = () => false;
    } else {
      this.input.oncopy = () => {};
      this.input.onpaste = () => {};
    }
  }

  setValue(val) {
    this.formItSelf = true;

    // Si valeur nulle
    if (val === null || typeof val === 'undefined') {
      this.clearInput();
      return;
    }

    if (this.type === 'number') {
      this.setValueForNumber(val);
    } else if (this.type === 'tel') {
      this.setValueForTel(val);
    } else {
      // Inject to input
      this.input.value = val; // Inject to input
      this.value = val;
    }
  }

  setValueForTel(val) {
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
    this.value = newValue;
  }

  // Met des classes à l'input si celui-ci a une icone
  setClassFromIco() {
    if (!this.input) return;

    let l;
    if (this.slotLeft && this.slotLeft.assignedElements) {
      l = this.slotLeft.assignedElements().length !== 0;
    }
    l
      ? this.input.classList.add('has-icon-left')
      : this.input.classList.remove('has-icon-left');

    let r;
    if (this.slotRight && this.slotRight.assignedElements) {
      l = this.slotRight.assignedElements().length !== 0;
    }
    r
      ? this.input.classList.add('has-icon-right')
      : this.input.classList.remove('has-icon-right');
  }

  setLabelState() {
    [...document.querySelectorAll(`[for="${this.id}"]`)].forEach(label => {
      if (label.tagName === 'BUX2-LABEL')
        label.setAttribute('state', this.state); // label.state ne fonctionne pas ???
    });
  }

  setRequired() {
    // Check what label current input is associated with
    const associatedLabelEl = document.querySelector(`[for="${this.id}"]`);

    // VueJs => avoid case where for="id" doesn't exist
    if (!associatedLabelEl) return;

    // Apply
    if (this.required) {
      this.input.setAttribute('required', '');
      // Boolean checking if there's already the span generated by the required attribute
      const alreadyMandatory = associatedLabelEl.innerHTML.includes(
        '<span class="c-label--mandatory" aria-hidden="true"> *</span>'
      );
      if (alreadyMandatory) return;
      associatedLabelEl.innerHTML +=
        '<span class="c-label--mandatory" aria-hidden="true"> *</span>';
    } else {
      this.input.removeAttribute('required');
      associatedLabelEl.querySelector('.c-label--mandatory').remove();
    }
  }

  clearInput() {
    this.input.classList.add('c-input-noval');
    this.value = '';
    this.input.value = '';
  }

  // Met une classe en fonction du state de l'input
  setClassFromState() {
    switch (this.state) {
      case 'valid':
        this.input.classList.remove('error', 'empty');
        this.input.classList.add('valid');

        this.a11yEl.style.display = 'none';
        this.input.removeAttribute('aria-describedby');
        if (this.errorSlot) this.errorSlot.style.display = 'none';
        break;
      case 'error':
        if (this.errorSlot) {
          // A11y Stuff
          if (
            this.errorSlot &&
            typeof this.errorSlot.assignedElements === 'function' &&
            this.errorSlot.assignedElements().length > 0
          ) {
            // Generate html for inside error element for a11y
            const html = this.errorSlot
              .assignedElements()
              .reduce((acc, current) => (acc += current.innerHTML), '');
            this.a11yEl.innerHTML = html;
            this.a11yEl.style.display = '';

            // Affect id to the a11yEl and put it to input inside aria-describedby
            const errorId = 'c-input-error' + count++;
            this.a11yEl.id = errorId;
            this.input.setAttribute('aria-describedby', errorId);

            // Display error Slot for eve
            this.a11yEl.style.display = '';
          }
          this.errorSlot.style.display = '';
        }

        this.input.classList.remove('valid', 'empty');
        this.input.classList.add('error');

        break;
      case 'empty':
      default:
        this.input.classList.remove('valid', 'error');
        this.input.classList.add('empty');

        this.input.removeAttribute('aria-describedby');
        this.a11yEl.style.display = 'none';
        if (this.errorSlot) this.errorSlot.style.display = 'none';
        break;
    }
  }

  setValueForNumber(val) {
    let newValue = '';

    if (val === null || typeof val === 'undefined') {
      // Si valeur nulle
      this.clearInput();
    } else {
      // Si valeur non nulle

      // Remove white space
      newValue = val.replace(/\s/g, '');

      // convert , to .
      newValue = newValue.replace(/,/g, '.');

      // Pas deux virgule dans le meme nombre
      if (newValue.split('.').length === 3 && newValue.slice(-1) === '.') {
        this.input.value = this.input.value.slice(0, -1);
        return;
      }

      // Ne pas supprimer le plus et le moins devant un chiffre
      // et ne pas pas permettre à l'utilisateur de faire ++..++ ou --..--
      // ou mettre un - ou + au milieu d'un nombre
      if (newValue.slice(-1) === '-' || newValue.slice(-1) === '+') {
        // ne pas permettre de mettre + et - au milieu d'un nombre
        // ou d'écrire ++ ou --
        // ex : 52-1
        if (newValue.length > 1) {
          this.input.value = this.input.value.slice(0, -1);
          return;
        }

        // ne pas permettre de mettre - si le min est sup à 0
        if (newValue.slice(-1) === '-' && this.min && this.min >= 0) {
          this.input.value = null;
          return;
        }

        // Ne pas supprimer le plus et le moins devant un chiffre
        return;
      }

      // Check is last char is dot or minus or pos and the "avant-dernier" is a number
      // wait other char to do something
      if (
        newValue.slice(-1) === '.' &&
        Number.isInteger(parseInt(newValue.slice(-2, -1))) &&
        this.round != 0
      ) {
        return;
      }

      // Regarde si l'utilisateur essaye de rentrer 0.0xxxxx1
      const oldNumberAfterDot = countDecimals(newValue);

      // string to number
      newValue = parseFloat(newValue);

      if (!isNaN(newValue)) {
        // Not inf to min
        if (this.min) {
          if (newValue < this.min) newValue = removeLastEnterNumber(newValue);
        }

        // Not sup to max
        if (this.max) {
          if (newValue > this.max) newValue = removeLastEnterNumber(newValue);
        }

        // good format
        newValue = newValue.toLocaleString('fr-FR');
        const newNumberAfterDot = countDecimals(newValue);

        // Rajoute les 0 après la virgule
        if (oldNumberAfterDot > newNumberAfterDot) {
          // Pas de virgule dans le nouveau
          if (newNumberAfterDot === 0) newValue += ',';

          let diff = oldNumberAfterDot - newNumberAfterDot;

          while (diff > 0) {
            newValue += '0';
            diff--;
          }
        }

        // Round this
        // si il y a plus de décimal que la valeur de l'attribut round
        // il les supprimes
        const roundNumber = countDecimals(newValue);
        if (this.round && roundNumber > this.round) {
          newValue = '' + newValue;
          newValue = newValue.slice(0, this.round - roundNumber);
        }

        // Si nombre entier supprime la virgule restante.
        if (this.round == 0 && newValue.slice(-1) === ',') {
          newValue = newValue.slice(0, -1);
        }

        if (newValue === 'NaN') {
          this.clearInput();
          return;
        }

        this.input.value = newValue;

        // convert again to number to be sure to have the same
        // number from input and bux2-input
        // because sometime more number after the float
        // Remove white space
        newValue = newValue.replace(/\s/g, '');
        newValue = newValue.replace(/,/g, '.');

        this.value = parseFloat(newValue);

        this.input.classList.remove('c-input-noval');
      } else {
        this.clearInput();
      }
    }
  }
}

// Compte le numbre de chiffre après la virgule
function countDecimals(val) {
  // Cherche .
  let proVal = val.split('.');

  if (proVal.length === 1) {
    // Cherche ,
    proVal = val.split(',');
  }

  return proVal.length === 1 ? 0 : proVal[1].length;
}

function removeLastEnterNumber(num) {
  num = '' + num;
  num = num.slice(0, -1);
  return parseFloat(num);
}

customElements.define('bux2-input', Input);
