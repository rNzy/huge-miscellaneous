import './bux-bulle-item/bulle-item.component';

import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';
import BtnNoStyleMixin from '../../../mixins/styles/btnNoStyle.mixin';
import BreakpointMixin from '../../../mixins/dom/breakpoint.mixin';

// Remove this if you don't have style
import styleDefault from './bulle.styles.css';

const Base = BreakpointMixin(BtnNoStyleMixin(StackMixin(BaseShadowComponent)));
const tpl = document.createElement('template');
tpl.innerHTML =
  '<div class="js-container"><slot style="display: none;"></slot><button class="m-btn-no-style c-bulle-btn" aria-lable="ouvrir le menu"><bux2-svg size="perso" class="c-svg2--perso" icon="contact" stroke="white" fill="none"></bux2-svg></button></div>';

export default class Bulle extends Base {
  // Properties for this component
  static get properties() {
    return {
      icon: { type: 'string' },
      open: { type: 'boolean' }
    };
  }

  // Style for this component
  // Remove this if you don't have style
  static get style() {
    return styleDefault.toString();
  }

  // Remove this if you don't have template
  template() {
    return tpl;
  }

  constructor() {
    super();
  }

  // Remove this if you don't put code
  connectedCallback() {
    [...this.children].forEach(child => {
      child.style.transform = 'scale(0)';
      child.style.transition = 'transform 200ms';
    });
    if (super.connectedCallback) super.connectedCallback();
    if (!this.verticalSpace) this.verticalSpace = 'sm';
    this._slots[0].style.display = '';

    this.$.querySelector('.m-btn-no-style').onclick = () => {
      if (this.open) {
        [...this.children].forEach(child => {
          child.style.transform = 'scale(0)';
        });
        this.open = false;
      } else {
        [...this.children].forEach(child => {
          child.style.transform = 'scale(1)';
        });
        this.open = true;
      }
    };
  }

  // Remove this if you don't put code
  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    // Put your code here
  }

  // Remove this if you don't put code
  disconnectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Put your code here
  }
}

customElements.define('bux2-bulle', Bulle);
