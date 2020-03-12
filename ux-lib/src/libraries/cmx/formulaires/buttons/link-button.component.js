import LinkButtonBase from '../../../../core/components/formulaires/buttons/link-button.component';
import styleDefault from './button.style.css';

/**
 * This is a link with button appearance
 */
class LinkButton extends LinkButtonBase {
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
    if (name === 'small')
      this.setBooleanClass(this.small, 'c-btn--small', this.container);
  }
}

customElements.define('ux-link-btn', LinkButton);
