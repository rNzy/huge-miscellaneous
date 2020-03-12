import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const KEYCODE = {
  SPACE: 32
};

/**
 * Composant affichant une case à cocher.
 *
 * @element ux-checkbox
 *
 * @prop {Boolean} checked - indique si la case est cochée
 * @prop {Boolean} disabled - indique si la case à cocher est désactivée
 *
 * @export
 * @class CheckboxBase
 * @extends {BaseShadowComponent}
 */
export default class CheckboxBase extends Base {
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
        const label = document.querySelector(`ux-label[for=${this.id}]`);

        if (this.disabled) {
          this.setAttribute('aria-disabled', true);
          this.removeAttribute('tabindex');
          this.blur();

          // Set label
          if (label) {
            label.setAttribute('disabled', 'true');
          }
        } else {
          this.tabIndex = 0;
          this.setAttribute('aria-disabled', false);

          // Set label
          if (label) {
            label.removeAttribute('disabled');
          }
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

    if (event.keyCode === KEYCODE.SPACE) {
      event.preventDefault();
      this._toggleChecked();
    } else {
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
