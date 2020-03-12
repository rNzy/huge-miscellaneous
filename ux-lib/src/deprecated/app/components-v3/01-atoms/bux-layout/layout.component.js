import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import FineSlotChange from '../../../mixins/dom/fineslotchange.mixin';

import styleDefault from './layout.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<section class="js-container grid-masonry">
<slot></slot>
</section>`;

export default class Layout extends FineSlotChange(BaseShadowComponent) {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this.onMutation = false;
    this._onSlotChange = this._onSlotChange.bind(this);
    const slot = this.$.querySelector('slot');
    this.fineSlotChange(slot, this._onSlotChange);
  }

  attributeChangedCallback() {
    if (super.attributeChangedCallback) super.attributeChangedCallback();
    this._defineItems();
    this._resizeAllGridItems();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    setTimeout(() => {
      this._defineItems();
      this._resizeAllGridItems();
    }, 200);
  }

  // set item classes
  _defineItems() {
    const items = [...this.children];

    items.forEach(item => {
      if (item.classList.contains('grid-item')) return;
      item.classList.add('grid-item');
    });
  }

  // Find item Heigh
  _getHeighItem(item) {
    const grid = this.$.querySelector('.grid-masonry');
    const rowHeight = 0;
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
    );

    let itemH;

    // EDGE FIX and Old firefox getBoundingClientRect return bad value
    // beacause of shadow
    if (
      this.navigator.name.includes('Edge') ||
      (this.navigator.name === 'Firefox' && this.navigator.version <= '62')
    ) {
      itemH = item.getBoundingClientRect().height;
      if (item.tagName === 'BUX2-CARD') {
        itemH =
          item.shadowRoot.querySelector('section').getBoundingClientRect()
            .height + 20; //
      }
    } else {
      grid.style.gridAutoRows = 0;
      itemH = item.getBoundingClientRect().height;
    }

    return Math.ceil((itemH + rowGap) / (rowHeight + rowGap));
  }

  // get all grid items and for each items add methods
  // Find all item chield Heigh
  // Apply to all chield a new gridRowEnd
  _resizeAllGridItems() {
    const allItems = this.getElementsByClassName('grid-item');

    const allH = [];
    const l = allItems.length;

    for (let i = 0; i < l; i++) {
      // instantiate the resizeGridItem method on each item
      allH[i] = this._getHeighItem(allItems[i]);
    }

    for (let i = 0; i < l; i++) {
      // instantiate the resizeGridItem method on each item
      allItems[i].style.gridRowEnd = 'span ' + allH[i];
    }
  }

  _onSlotChange() {
    if (!this.onMutation) {
      this.onMutation = true;
      this._defineItems();
      this._resizeAllGridItems();
      this.onMutation = false;
    }
  }
}

customElements.define('bux-layout', Layout);
