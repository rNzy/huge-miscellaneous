import { TextBase } from './../../../../core/components/typography/text/text.component';
import BackgroundMixin from '../../../../core/mixins/styles/background.mixin';

import styleDefault from './text.style.css';

const Base = BackgroundMixin(TextBase);

/**
 * Composant permettant d'afficher du texte dans différentes balises html. Par défaut ux-text crée une balise span.
 */
class Text extends Base {
  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    this.setBooleanClass(this.background, 'c-text--background');
    this.setBooleanClass(this.backgroundLight, 'c-text--background');
  }
}

customElements.define('ux-text', Text);
