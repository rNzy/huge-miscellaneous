import { TextBase } from '../../../../core/components/typography/text/text.component';
import ColorThemeMixin from '../../../../core/mixins/typography/color-theme.mixin';
import styleDefault from './text.style.css';

const Base = ColorThemeMixin(TextBase);
/**
 * This is a simple text
 */
class Text extends Base {
  static get properties() {
    return {
      theme: {
        type: 'string'
      },
      shadow: { type: 'boolean' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.libSize) this.libSize = 'sm';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    if (!this.container) return;
    if (name === 'theme') {
      if (this.container) {
        switch (this.theme) {
          case 'primary':
          case 'light':
          case 'dark':
          case 'white':
          case 'error':
          case 'success':
            this.container.classList.add('c-theme--' + this.theme);
            break;
        }
      }
    } else if (name === 'shadow') {
      if (this.shadow) {
        this.container.classList.add('c-text--shadow');
      } else {
        this.container.classList.remove('c-text-shadow');
      }
    }
  }
}

customElements.define('ux-text', Text);
