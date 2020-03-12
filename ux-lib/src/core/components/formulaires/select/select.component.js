import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';

const Base = SlotChange(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<select class="c-select">
</select>
<div class="c-select-error-msg">
  <slot name="error"></slot>
</div>
<slot style="display:none" class="c-select-option"></slot>
`;

/**
 *
 * @export
 * @class SelectBase
 * @extends {Base}
 *
 * @prop {Boolean} [required=false] - l'element requis
 * @prop {'empty'|'succes'|'error'} [state=empty] - l'état du select
 * @prop {String} value - la valeur du select
 *
 * @slot - slot par défaut qui doit contenir les options
 * @slot error - contient le message d'erreur
 *
 * @event change - dispatch l'évènement change au changement de valeur
 */
export default class SelectBase extends Base {
  static get properties() {
    return {
      required: { type: 'boolean' },
      state: { type: 'string', defaultValue: 'empty' }, // error, success, empty
      value: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.selectEl = this.$.querySelector('.c-select');

    this.moveAndInitOption = this.moveAndInitOption.bind(this);

    this.slotChange(
      this.$.querySelector('.c-select-option'),
      this.moveAndInitOption
    );
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Handle change
    this.selectEl.addEventListener('input', () => {
      this.value = this.selectEl.value;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: this.value
          },
          bubbles: true
        })
      );
    });

    // Move option into select and init value
    this.moveAndInitOption();
  }

  moveAndInitOption() {
    this.options = this.querySelectorAll('option');
    if (this.options.length === 0)
      this.options = this.$.querySelectorAll('option');

    this.selectEl.innerHTML = '';
    [...this.options].forEach(opt => {
      this.selectEl.appendChild(opt.cloneNode(true));
    });

    if (this.value) {
      this.selectEl.value = this.value;
    } else if (this.options.length > 0) {
      this.selectEl.value = this.value = this.options[0].value;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'state':
        this.setState();
        break;
      case 'value':
        this.selectEl.value = newValue;
        break;
      case 'required':
        this.selectEl.required = this.required;
        break;
    }
  }

  setState() {
    this.selectEl.classList.remove(
      'c-select-success',
      'c-select-error',
      'c-select-empty'
    );

    this.selectEl.classList.add(`c-select-${this.state}`);

    const errorEl = this.$.querySelector('.c-select-error-msg');

    if (this.state === 'error') {
      errorEl.style.display = 'block';
    } else {
      errorEl.style.display = 'none';
    }
  }
}
