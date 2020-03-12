import Card from '../card.component';

import styleDefault from './css/card.style.css';

class AzbCard extends Card {
  static get properties() {
    return {
      noborder: {
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
    if (oldValue === newValue) return;
    switch (name) {
      case 'noborder':
        if (!this.container) return;
        if (this.noborder) {
          this.container.classList.add('c-card--no-border');
        } else {
          this.container.classList.remove('c-card--no-border');
        }
        break;
    }
  }
}

window.customElements.define('bux2-card', AzbCard);
