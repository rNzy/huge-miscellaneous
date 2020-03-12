import BaseShadowComponent from '../../../../mixins/base/baseShadowComponent.mixin.js';
import BackgroundMixin from '../../../../mixins/styles/background.mixin.js';
import AriaRoleBtnMixin from '../../../../mixins/aria/roleBtn.mixin';

// Remove this if you don't have style
import styleDefault from './bulle-item.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="js-container c-bulle-item"><slot></slot></div>';

export default class BulleItem extends AriaRoleBtnMixin(
  BackgroundMixin(BaseShadowComponent)
) {
  // Properties for this component
  static get properties() {
    return {
      icon: { type: 'string' },
      backgroundIcon: { type: 'boolean' },
      stroke: { type: 'string' },
      fill: { type: 'string' }
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
  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    let svgEl = this.container.querySelector('.bulle-item-svg');

    if (this.icon) {
      if (svgEl) {
        svgEl.icon = this.icon;
      } else {
        svgEl = document.createElement('bux2-svg');
        svgEl.classList.add('bulle-item-svg');
        svgEl.setAttribute('icon', this.icon);
        this.container.insertAdjacentElement('afterbegin', svgEl);
      }
      this.fill ? (svgEl.fill = this.fill) : (svgEl.fill = '');
      this.stroke ? (svgEl.stroke = this.stroke) : (svgEl.stroke = '');
    } else {
      if (svgEl) svgEl.parentNode.removeChild(svgEl);
    }
  }
}

customElements.define('bux2-bulle-item', BulleItem);
