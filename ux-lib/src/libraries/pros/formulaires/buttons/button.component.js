import ButtonBase from '../../../../core/components/formulaires/buttons/button.component';
import styleDefault from './button.style.css';

/**
 * This is a simple button
 */
class Button extends ButtonBase {
  static get properties() {
    return {
      small: { type: 'boolean' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    if (name === 'small') {
      this._setSmall();
    }
  }

  _setSmall() {
    this.small
      ? this.container.classList.add('c-btn--small')
      : this.container.classList.remove('c-btn--small');
  }
}

customElements.define('ux-btn', Button);
