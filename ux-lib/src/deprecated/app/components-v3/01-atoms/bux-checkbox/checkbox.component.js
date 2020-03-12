import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const KEYCODE = {
  SPACE: 32
};

export default class Checkbox extends Base {
  static get properties() {
    return {
      checked: {
        type: 'boolean'
      },
      disabled: {
        type: 'boolean'
      }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'checked':
        if (this.checked) this.setAttribute('aria-checked', true);
        else this.setAttribute('aria-checked', false);
        break;
      case 'disabled':
        if (this.disabled) {
          this.setAttribute('aria-disabled', true);
          this.removeAttribute('tabindex');
          this.blur();
        } else {
          this.setAttribute('tabindex', '0');
          this.setAttribute('aria-disabled', false);
        }
        break;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'checkbox');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', 0);

    this.addEventListener('keyup', this._onKeyUp);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('keyup', this._onKeyUp);
    this.removeEventListener('click', this._onClick);
  }

  _onKeyUp(event) {
    if (event.altKey) return;

    switch (event.keyCode) {
      case KEYCODE.SPACE:
        event.preventDefault();
        this._toggleChecked();
        break;
      default:
        return;
    }
  }

  _onClick() {
    this._toggleChecked();
  }

  _toggleChecked() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          checked: this.checked
        },
        bubbles: true
      })
    );
  }
}
