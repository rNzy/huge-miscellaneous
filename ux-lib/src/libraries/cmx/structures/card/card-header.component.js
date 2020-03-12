import CardHeaderBase from './../../../../core/components/structures/card/card-header.component';
import styleDefault from './card-header.style.css';

/**
 * Elément d'interface servant de header dans l'élément ux-card,
 * on y retrouvera généralement le titre d'une card.
 */
class CardHeader extends CardHeaderBase {
  static get properties() {
    return {
      fullWidth: { type: 'boolean' }
    };
  }
  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'full-width') {
      this.setBooleanClass(this.fullWidth, 'c-card-header--full');
    }
  }
}

customElements.define('ux-card-header', CardHeader);
