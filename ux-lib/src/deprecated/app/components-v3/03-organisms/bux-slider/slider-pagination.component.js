import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import BtnNoStyleMixin from '../../../mixins/styles/btnNoStyle.mixin';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin';

const Base = AriaHiddenStyleMixin(BtnNoStyleMixin(BaseShadowComponent));

// Remove this if you don't have style
import styleDefault from './slider-pagination.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<ul class="c-slider-pagination__ul"></ul>`;

const tplLi = document.createElement('template');
tplLi.innerHTML = `<li class="c-slider-pagination__li"><button class="m-btn-no-style c-slider-pagination__btn"></button></li>`;

export default class SliderPagination extends Base {
  // Properties for this component
  static get properties() {
    return {
      count: { type: 'number' },
      itemActive: { type: 'number' }
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
    if (super.connectedCallback) super.connectedCallback();
  }

  // Remove this if you don't put code
  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'count') {
      // Remove olds Items
      const ul = this.$.querySelector('.c-slider-pagination__ul');
      ul.innerHTML = '';
      this.items = [];

      // Make news Items
      for (let i = 0; i < this.count; i++) {
        const li = tplLi.content.cloneNode(true).querySelector('li');
        // Add click event
        li.addEventListener('click', () => {
          this.itemActive = i;
        });

        this.items.push(li);
        ul.appendChild(li);
      }
    } else if (name === 'item-active') {
      this.gotoItem(oldValue, newValue);
    }
  }

  gotoItem() {
    this.items.forEach((item, index) => {
      if (index == this.itemActive) {
        this.addCurrentItem(item, index);
      } else {
        this.removeCurrentItem(item, index);
      }
    });
  }

  addCurrentItem(item, index) {
    item.classList.add('active');

    const btn = item.querySelector('.c-slider-pagination__btn');
    btn.innerHTML = `<span class="a11y-hidden">éléments actif (${index +
      1} sur ${this.count})</span>`;

    this.dispatchEvent(
      new CustomEvent('change-active-item', {
        detail: {
          itemActive: index
        },
        bubbles: true
      })
    );
  }

  removeCurrentItem(item, index) {
    item.classList.remove('active');
    const btn = item.querySelector('.c-slider-pagination__btn');
    btn.innerHTML = `<span class="a11y-hidden">éléments inactif (${index +
      1} sur ${this.count})</span>`;
  }

  // Remove this if you don't put code
  disconnectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Put your code here
  }
}

customElements.define('bux2-slider-pagination', SliderPagination);
