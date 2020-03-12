import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import AriaDelegateFocus from '../../../mixins/aria/delegateFocus.mixin';
import Hidden from '../../../mixins/aria/hidden-style.mixin';

const Base = Hidden(AriaDelegateFocus(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-input-wrap">
  <input class="c-input js-delegate-focus"><slot name="content-right"></slot>
</div>
<div style="display:none;" class="a11y-desc a11y-hidden"></div>
<slot class="c-input-error" style="display:none;" name="error"></slot>
`;

let count = 0;

/**
 * Composant de base non fonctionnel permettant aux composants ux-input-foo de créer un élément input correspondant.
 * 
 * @element ux-input
 * 
 * @prop {Boolean} [required] - indique si le champ est requis
 * @prop {"valid"|"error"|"empty"} state - état du champ
 * @prop {String} [placeholder] - texte du placeholder
 * @prop {Number} [min] - valeur minimum
 * @prop {Number} [max] - valeur maximum
 * @prop {Number} [step] - le pas d'incrémentation
 * @prop {String} [value] - valeur initiée
 * @prop {Number} [round] - nombre arrondi
 * @prop {Number} [maxlength] - longueur maximum
 * @prop {Number} [minlength] - longueur minimum
 * @prop {String} a11ylabel - texte vocalisé
 * @prop {String} [autocomplete] - autocompletion (off, on, etc..) See https://developer.mozilla.org/fr/docs/Web/HTML/Attributs/autocomplete
 * @prop {Boolean} [readonly] - indique si le champ est en lecture seule
 * @prop {Boolean} [disabled] - indique si le champ est désactivé
 *
 * @slot content-right
 * @slot error
 * 
 * @export
 * @class InputBase
 * @extends {BaseShadowComponent, AriaDelegateFocus, Hidden}

 * @todo re dispatcher les propriétés dans les différents input car par
 * exemple max ne sert à rien pour un text...
 */
export default class InputBase extends Base {
  static get properties() {
    return {
      required: { type: 'boolean' },
      state: { type: 'string' },
      placeholder: { type: 'string' },
      min: { type: 'number' },
      max: { type: 'number' },
      step: { type: 'number' },
      value: { type: 'string' },
      round: { type: 'number' },
      maxlength: { type: 'number' },
      minlength: { type: 'number' },
      a11ylabel: { type: 'string' },
      autocomplete: { type: 'string' },
      readonly: { type: 'boolean' },
      disabled: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.input = this.$.querySelector('.c-input');
    this.errorSlot = this.$.querySelector('.c-input-error');
    this.wrap = this.$.querySelector('.c-input-wrap');
    this.a11yEl = this.$.querySelector('.a11y-desc');
    this.setValueListener = this.setValueListener.bind(this);
    this.dispatchListener = this.dispatchListener.bind(this);
  }

  setValueListener(e) {
    // Ces lignes servent à remettre le curseur à la bonne position
    // dans l'input quand l'utilisateur corrige la valeur

    const oldLength = this.input.value.length;
    let cursorPosition = 0;
    if (
      !(
        this.input.type === 'date' ||
        this.input.type === 'range' ||
        this.input.type === 'email'
      )
    )
      cursorPosition = this.input.selectionStart;

    // Formate bien la valeur
    this.setValue(e.target.value);
    this.dispatchEvent(new Event('change'));

    // Pas besoin de remettre le curseur en position sur l'input date
    // de plus les propriétés input.selectionStart et input.selectionEnd
    // n'existent pas pour un input de type date, ce qui causerait des
    // erreurs
    if (
      this.input.type === 'date' ||
      this.input.type === 'range' ||
      this.input.type === 'email'
    )
      return;

    // remettre le curseur à la bonne position

    if (this.input.value.length > oldLength) {
      cursorPosition++;
    }
    this.input.selectionStart = cursorPosition;
    this.input.selectionEnd = cursorPosition;
  }

  dispatchListener() {
    this.dispatchEvent(new Event('focus'));
  }

  connectedCallback() {
    this.input = this.$.querySelector('.c-input');
    this.wrap = this.$.querySelector('.c-input-wrap');

    if (super.connectedCallback) super.connectedCallback();
    if (!this.type) this.type = 'text';

    this.input.addEventListener('input', this.setValueListener);
    this.input.addEventListener('focus', this.dispatchListener);
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
        this.setBooleanAttr(this.required, 'required', this.input);
        break;
      case 'readonly':
        this.setBooleanAttr(this.readonly, 'readonly', this.input);
        break;
      case 'disabled':
        this.setBooleanAttr(this.disabled, 'disabled', this.input);
        break;
      case 'state':
        this.setClassFromState();
        this.setLabelState();
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
      case 'min':
        this.input.setAttribute('min', this.min);
        break;
      case 'max':
        this.input.setAttribute('max', this.max);
        break;
    }
  }

  setValue(val) {
    if (this.state === 'error') this.state = 'empty';

    this.formItSelf = true;

    // Inject to input
    this.input.value = val;
    this.value = val;

    this.state = 'empty';
  }

  clearInput(self) {
    self.input.classList.add('c-input-noval');
    self.value = '';
    self.input.value = '';
  }

  setLabelState() {
    [...document.querySelectorAll(`[for="${this.id}"]`)].forEach(label => {
      if (label.tagName === 'UX-LABEL') label.setAttribute('state', this.state); // label.state ne fonctionne pas ???
    });
  }

  setClassFromState() {
    switch (this.state) {
      case 'valid':
        this.input.classList.remove('error', 'empty');
        this.wrap.classList.remove('error', 'empty');

        this.input.classList.add('valid');
        this.wrap.classList.add('valid');

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
        this.wrap.classList.remove('valid', 'empty');

        this.input.classList.add('error');
        this.wrap.classList.add('error');
        break;
      case 'empty':
      default:
        this.input.classList.remove('valid', 'error');
        this.wrap.classList.remove('valid', 'error');

        this.input.classList.add('empty');
        this.wrap.classList.add('empty');

        this.input.removeAttribute('aria-describedby');
        this.a11yEl.style.display = 'none';
        if (this.errorSlot) this.errorSlot.style.display = 'none';
        break;
    }
  }
}
