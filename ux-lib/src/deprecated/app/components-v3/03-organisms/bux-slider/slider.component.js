import './slider-item.component';
import './slider-pagination.component';

// A supprimer quand on utilisera plus l'animation
// de changement d'opacité et donc la position absolute pour
// les bux-slider-item
import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';
import FineSlotChange from '../../../mixins/dom/fineslotchange.mixin';
import BtnNoStyleMixin from '../../../mixins/styles/btnNoStyle.mixin';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin';
import SwipeMixin from '../../../mixins/event/swipe.mixin';

const Base = SwipeMixin(
  AriaHiddenStyleMixin(FineSlotChange(BtnNoStyleMixin(BaseShadowComponent)))
);

// Remove this if you don't have style
import styleDefault from './slider.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<span class="a11y-hidden" tabindex="0">Début du carousel</span>
<div class="c-slider__wrap">
  <button class="m-btn-no-style c-slider__left"><span class="a11y-hidden">élément précédent</span><bux2-svg icon="arrow" rotate="180" style="border-radius:50%;background-color:rgba(255,255,255,0.5);" aria-hidden></bux2-svg></button>
  <div class="c-slider__content" role="list" tabindex="0" aria-label="contenue du carrousel"><slot></slot></div>
  <button class="m-btn-no-style c-slider__right"><span class="a11y-hidden">élément suivant</span><bux2-svg icon="arrow" style="border-radius:50%;background-color:rgba(255,255,255,0.5);"></bux2-svg></button>
</div>
<bux2-slider-pagination></bux2-slider-pagination>`;

const tplPolite = document.createElement('template');
tplPolite.innerHTML =
  '<div id="ariapolite" aria-live="polite" aria-atomic="true" class="a11y-hidden"></div>';

export default class Slider extends Base {
  // Properties for this component
  static get properties() {
    return {
      loop: {
        // Permet de boucler ou non
        type: 'boolean',
        defaultValue: true
      },
      pagination: { type: 'boolean', defaultValue: true },
      navigation: { type: 'boolean', defaultValue: true },
      itemActive: {
        type: 'number',
        defaultValue: 0
      }
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

  nextItem() {
    this.itemActive++;
  }

  prevItem() {
    this.itemActive--;
  }

  constructor() {
    super();

    this.tabIndex = 0;

    // Get item number and count it
    this.items = this.querySelectorAll('bux2-slider-item');
    this.countItem = this.items.length;

    // Bind prev and next fonction
    this.nextItem = this.nextItem.bind(this);
    this.prevItem = this.prevItem.bind(this);
    this.changeActiveItemFormPagination = this.changeActiveItemFormPagination.bind(
      this
    );

    // Init pagination component
    this.paginationEl = this.$.querySelector('bux2-slider-pagination');
    this.paginationEl.count = this.countItem;
    // Change from pagination component
    this.paginationEl.addEventListener(
      'change-active-item',
      this.changeActiveItemFormPagination
    );

    // Handle Key
    this.addEventListener('keyup', e => {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        this.nextItem();
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        this.prevItem();
      }
    });

    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.fineSlotChange(this.$.querySelector('slot'), this.handleSlotChange);

    this.addSwipeEvt();
    this.addEventListener('swipe-left-end', this.prevItem);
    this.addEventListener('swipe-right-end', this.nextItem);
  }

  // When we add some slider-item we need
  // to update items, count of item, pagination
  handleSlotChange() {
    // Get item number and count it
    this.items = this.querySelectorAll('bux2-slider-item');
    this.countItem = this.items.length;
    this.paginationEl.count = this.countItem;

    this.itemActive = this.paginationEl.itemActive = this.itemActive;
  }

  changeActiveItemFormPagination(e) {
    this.gotoItem(this.itemActive, e.detail.itemActive);
  }

  // Remove this if you don't put code
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Click on arrow
    this.$.querySelector('.c-slider__left').addEventListener(
      'click',
      this.prevItem
    );
    this.$.querySelector('.c-slider__right').addEventListener(
      'click',
      this.nextItem
    );
  }

  // Remove this if you don't put code
  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (oldValue === newValue) return;

    // Put your code here
    if (name === 'item-active') {
      // Goto Item
      this.gotoItem(oldValue, newValue);

      // First time insert polite element
      if (!this.polite) {
        this.$.appendChild(tplPolite.content.cloneNode(true));
        this.polite = this.$.querySelector('#ariapolite');
      }
      this.polite.textContent = `élément ${+this.itemActive + 1} sur ${
        this.countItem
      }`;
    }
  }

  // Remove this if you don't put code
  disconnectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    this.$.querySelector('.c-slider__left').removeEventListener(
      'click',
      this.prevItem
    );
    this.$.querySelector('.c-slider__right').removeEventListener(
      'click',
      this.nextItem
    );

    this.$.querySelector('bux2-slider-pagination').removeEventListener(
      'change-active-item',
      this.changeActiveItemFormPagination
    );
  }

  gotoItem(oldItem, newItem) {
    if (oldItem == newItem) return;
    if (newItem < 0) {
      if (this.loop) {
        newItem = this.countItem - 1;
      } else {
        newItem = 0;
      }
    } else if (this.itemActive > this.countItem - 1) {
      if (this.loop) {
        newItem = 0;
      } else {
        newItem = this.countItem - 1;
      }
    }

    if ((oldItem || oldItem === 0) && this.items[oldItem]) {
      this.items[oldItem].active = false;
    }

    if ((newItem || newItem === 0) && this.items[newItem]) {
      this.items[newItem].active = true;
    }

    this.itemActive = newItem;
    this.paginationEl.itemActive = newItem;
  }
}

customElements.define('bux2-slider', Slider);
