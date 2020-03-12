import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML =
  '<div class="js-container c-heading"><slot name="right"></slot></div>';

/**
 * Permet de créer un élément titre pré-stylisé pouvant afficher un titre et un bouton.
 *
 * @element ux-heading
 *
 * @prop {String} [tag=span] - type de la balise h1, span, h2...
 *
 * @slot right
 *
 * @export
 * @class HeadingBase
 * @extends {BaseShadowComponent}
 */
export class HeadingBase extends Base {
  static get properties() {
    return {
      tag: {
        type: 'string'
      }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.tagEl = null;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.makeTagElement();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    if (name === 'tag') {
      this.makeTagElement(oldValue);
    }
  }

  makeTagElement(oldValue) {
    if (!this.tag) return;

    if (this.tagEl) {
      if (this.tagEl && this.tagEl.tagName.toLowerCase() !== this.tag) {
        if (oldValue && this.container)
          this.container.classList.remove(`c-heading__${this.tag}`);
        this.tagEl.remove();
        this.tagEl = null;
        this.createTag();
      }
    } else {
      this.createTag();
    }
  }

  createTag() {
    this.tagEl = document.createElement(this.tag);
    this.container.classList.add(`c-heading__${this.tag}`);
    this.tagEl.classList.add(
      'c-heading__title',
      `c-heading__title--${this.tag}`
    );
    this.tagEl.innerHTML = '<slot></slot>';
    this.container.insertBefore(this.tagEl, this.container.firstChild);
  }
}
