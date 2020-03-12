import ButtonBase from '../../../../core/components/formulaires/buttons/button.component';
import styleDefault from './button.style.css';

/**
 * @prop {Boolean} auth - ajoute un style particulier pour l'authentification
 */

class Button extends ButtonBase {
  static get properties() {
    return {
      small: { type: 'boolean' },
      auth: {
        type: 'boolean'
      }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'small') this.setBooleanClass(this.small, 'c-btn--small');
    if (name === 'auth') {
      this.setBooleanClass(this.hasAttribute('auth'), 'c-btn--auth');
    }
  }
}

customElements.define('ux-btn', Button);
