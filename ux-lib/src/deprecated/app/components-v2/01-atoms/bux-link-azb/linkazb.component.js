const tpl = document.createElement('template');
tpl.innerHTML = `
<style>
  .c-link__arrow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: var(--white);
    background-color: var(--brand);
    border-radius: 0 3px 3px 0;
    height: 100%;
    width: 30px;
  }

  .c-link--block {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
</style>
<a class="js-container c-link" href="">
  <slot></slot>
</a>
`;

class LinkAZB extends HTMLElement {
  static get observedAttributes() {
    return ['data-link', 'data-label', 'a11y-label', 'block', 'block-arrow'];
  }

  connectedCallback() {
    this.appendChild(tpl.content.cloneNode(true));

    // access an element in the shadowRoot through a .js- prefixed class
    this.container = this.querySelector('.js-container');
    this._setLinkPath();
    this._setAriaLabel();
    this._setTitle();
    this._setBlock();
    this._setArrowTpl();
  }

  attributeChangedCallback(name) {
    switch (name) {
      case 'data-link':
        if (this.container) {
          this._setLinkPath();
        }
        break;
      case 'data-label':
        if (this.container) {
          this._setTitle();
        }
        break;
      case 'a11y-label':
        if (this.container) {
          this._setAriaLabel();
        }
        break;
      case 'block':
        if (this.container) {
          this._setBlock();
        }
        break;
      case 'block-arrow':
        if (this.container) {
          this._setBlock();
          this._setArrowTpl();
        }
    }
  }

  /**
   * @property
   * @type {string} link / data-link - primary or secondary
   */

  get link() {
    return this.getAttribute('data-link');
  }

  set link(value) {
    this.setAttribute('data-link', value);
  }

  _setLinkPath() {
    this.container.setAttribute('href', this.link);
  }

  /**
   * @property
   * @type {string} ariaLabel / a11y-label - sets a title and aria-label -
   */

  get ariaLabel() {
    return this.getAttribute('a11y-label');
  }

  set ariaLabel(value) {
    this.setAttribute('a11y-label', value);
  }

  _setAriaLabel() {
    if (this.hasAttribute('a11y-label'))
      this.container.setAttribute('aria-label', this.ariaLabel);
  }

  /**
   * @property
   * @type {string} dataLabel / data-label - sets a title and aria-label -
   */

  get dataLabel() {
    return this.getAttribute('data-label');
  }

  set dataLabel(value) {
    this.setAttribute('data-label', value);
  }

  _setTitle() {
    if (this.hasAttribute('data-label'))
      this.container.setAttribute('title', this.dataLabel);
  }

  /**
   * @property
   * @type {boolean} block - set the link as a block when nested in another component
   */

  set block(value) {
    const isBlock = Boolean(value);
    if (isBlock) this.setAttribute('block', '');
    else this.removeAttribute('block');
  }

  get block() {
    return this.hasAttribute('block');
  }

  _setBlock() {
    if (this.hasAttribute('block') || this.hasAttribute('block-arrow')) {
      this.container.classList.add('c-link--block');
    } else {
      this.container.classList.remove('c-link--block');
    }
  }

  /**
   * @property
   * @type {boolean} block-arrow - set the link as a block when nested in another
   * component and add an arrow for styling purpose
   */

  set blockArrow(value) {
    const isBlock = Boolean(value);
    if (isBlock) this.setAttribute('block-arrow', '');
    else this.removeAttribute('block-arrow');
  }

  get blockArrow() {
    return this.hasAttribute('block-arrow');
  }

  _setArrowTpl() {
    if (this.hasAttribute('block-arrow')) {
      const arrowTpl = document.createElement('template');
      arrowTpl.innerHTML = `
      <svg class="c-link__arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.707,11.253L9.707,4.253C9.521,4.073 9.271,3.972 9.012,3.972C8.464,3.972 8.012,4.424 8.012,4.972C8.012,5.231 8.113,5.481 8.293,5.667L14.586,11.96L8.293,18.253C8.098,18.441 7.988,18.701 7.988,18.972C7.988,19.521 8.439,19.972 8.988,19.972C9.259,19.972 9.519,19.862 9.707,19.667L16.707,12.667C17.095,12.279 17.095,11.641 16.707,11.253Z"></path>
      </svg>`;
      this.container.append(arrowTpl.content.cloneNode(true));
    }
  }
}

window.customElements.define('bux2-link-azb', LinkAZB);
