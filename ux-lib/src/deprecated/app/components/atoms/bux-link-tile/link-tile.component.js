import BuxClass from '../../../../bux.class';
import './link-tile.styles.scss';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-link-tile">
    <div class="c-link-tile__content"></div>

    <bux-svg data-icon="arrow" data-class="c-svg c-link-tile__arrow"></bux-svg>
    <a class="c-link-tile__link" href=""></a>
</div>
`;
customElements.define(
  'bux-link-tile',
  class LinkTile extends BuxClass {
    static get observedAttributes() {
      return [
        'data-icon',
        'data-image',
        'data-label',
        'data-sublabel',
        'data-link',
        'data-badges',
        'data-title',
        'a11y-label',
        'bold',
        'shadow',
        'colored'
      ];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;

      const nTpl = tpl.content.cloneNode(true);
      this.container = nTpl.querySelector('.c-link-tile');
      this.contentContainer = nTpl.querySelector('.c-link-tile__content');
      this.linkEl = nTpl.querySelector('.c-link-tile__link');

      this._upgradeProperty('icon');
      this._upgradeProperty('image');
      this._upgradeProperty('label');
      this._upgradeProperty('subLabel');
      this._upgradeProperty('link');
      this._upgradeProperty('bold');
      this._upgradeProperty('shadow');
      this._upgradeProperty('colored');
      this._upgradeProperty('ariaLabel');

      this._setIcon();
      this._setImage();
      this._setLabel();
      this._setSubLabel();
      this._setLink();
      this._setTitle();
      this._setAriaLabel();
      this._setBadges();
      this._setBold();
      this._setShadow();
      this._setColored();

      this.appendChild(nTpl);
    }

    /*eslint-disable */
    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        const value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }
    /*eslint-enable */

    attributeChangedCallback(name) {
      switch (name) {
        case 'data-icon':
          this._updateIcon();
          break;
        case 'data-image':
          this._updateImage();
          break;
        case 'data-label':
          this._updateLabel();
          break;
        case 'data-sublabel':
          this._updateSubLabel();
          break;
        case 'data-link':
          if (this.linkEl) this._setLink();
          break;
        case 'data-badges':
          if (this.contentContainer) this._setBadges();
          break;
        case 'data-title':
          if (this.linkEl) this._setTitle();
          break;
        case 'a11y-label':
          if (this.linkEl) this._setAriaLabel();
          break;
        case 'bold':
          if (this.container) this._setBold();
          break;
        case 'shadow':
          if (this.container) this._setShadow();
          break;
        case 'colored':
          if (this.container) this._setColored();
          break;
      }
    }

    get icon() {
      return this.getAttribute('data-icon');
    }

    set icon(value) {
      this.setAttribute('data-icon', value);
    }

    get image() {
      return this.getAttribute('data-image');
    }

    set image(value) {
      this.setAttribute('data-image', value);
    }

    get label() {
      return this.getAttribute('data-label');
    }

    set label(value) {
      this.setAttribute('data-label', value);
    }

    get subLabel() {
      return this.getAttribute('data-sublabel');
    }

    set subLabel(value) {
      this.setAttribute('data-sublabel', value);
    }

    get link() {
      return this.getAttribute('data-link');
    }

    set link(value) {
      this.setAttribute('data-link', value);
    }

    get title() {
      return this.getAttribute('data-title');
    }

    set title(value) {
      this.setAttribute('data-title', value);
    }

    get ariaLabel() {
      return this.getAttribute('a11y-label');
    }

    set ariaLabel(value) {
      this.setAttribute('a11y-label', value);
    }

    get badges() {
      return this.getAttribute('data-badges');
    }

    set badges(value) {
      this.setAttribute('data-badges', value);
    }

    get bold() {
      return this.hasAttribute('bold') && this.getAttribute('bold') !== 'false';
    }

    set bold(value) {
      const isBold = Boolean(value);
      if (isBold) this.setAttribute('bold', '');
      else this.removeAttribute('bold');
    }

    get shadow() {
      return (
        this.hasAttribute('shadow') && this.getAttribute('shadow') !== 'false'
      );
    }

    set shadow(value) {
      const isShadow = Boolean(value);
      if (isShadow) this.setAttribute('shadow', '');
      else this.removeAttribute('shadow');
    }

    get colored() {
      return (
        this.hasAttribute('shadow') && this.getAttribute('shadow') !== 'false'
      );
    }

    set colored(value) {
      const isColored = Boolean(value);
      if (isColored) this.setAttribute('colored', '');
      else this.removeAttribute('colored');
    }

    _setIcon() {
      if (this.icon && this.icon !== 'undefined') {
        const iconEl = document.createElement('bux-svg');
        iconEl.setAttribute('data-icon', this.icon);
        iconEl.setAttribute('data-class', 'c-link-tile__icon');
        this.container.insertBefore(iconEl, this.container.firstChild);
      }
    }

    _updateIcon() {
      const iconEl = this.querySelector('bux-svg');
      if (iconEl) iconEl.setAttribute('data-icon', this.icon);
    }

    _setImage() {
      if (this.image && this.image !== 'undefined') {
        const imageEl = document.createElement('bux2-image');
        imageEl.setAttribute('src', this.image);
        imageEl.setAttribute('width', '30');
        imageEl.style.marginRight = '10px';
        this.container.insertBefore(imageEl, this.container.firstChild);
      }
    }

    _updateImage() {
      const imageEl = this.querySelector('bux2-image');
      if (imageEl) imageEl.setAttribute('src', this.image);
    }

    _setLabel() {
      if (this.label && this.label !== 'undefined') {
        const labelEl = document.createElement('div');
        labelEl.classList.add('c-link-tile__label');
        labelEl.textContent = this.label;
        this.contentContainer.appendChild(labelEl);
      }
    }

    _updateLabel() {
      const labelEl = this.querySelector('.c-link-tile__label');
      if (labelEl) labelEl.textContent = this.label;
    }

    _setSubLabel() {
      if (this.subLabel && this.subLabel !== 'undefined') {
        const sublabelEl = document.createElement('div');
        sublabelEl.classList.add('c-link-tile__sublabel');
        sublabelEl.textContent = this.subLabel;
        this.contentContainer.appendChild(sublabelEl);
      }
    }

    _updateSubLabel() {
      const sublabelEl = this.querySelector('.c-link-tile__sublabel');
      if (sublabelEl) sublabelEl.textContent = this.subLabel;
    }

    _setLink() {
      if (this.link && this.link !== 'undefined') {
        this.linkEl.setAttribute('href', this.link);
      }
    }

    _setTitle() {
      if (this.link && this.link !== 'undefined' && this.title) {
        this.linkEl.setAttribute('title', this.title);
      }
    }

    _setAriaLabel() {
      if (this.link && this.link !== 'undefined' && this.ariaLabel) {
        this.linkEl.setAttribute('aria-label', this.ariaLabel);
      }
    }

    _setBadges() {
      if (this.badges && this.badges !== 'undefined') {
        const badgesContainer = document.createElement('div');
        badgesContainer.classList.add('.c-link-tile__badges');
        badgesContainer.innerHTML = this.badges;
        this.contentContainer.appendChild(badgesContainer);
      }
    }

    _setBold() {
      if (this.hasAttribute('bold')) {
        this.container.classList.add('c-link-tile--bold');
      } else {
        this.container.classList.remove('c-link-tile--bold');
      }
    }

    _setShadow() {
      if (this.hasAttribute('shadow')) {
        this.container.classList.add('c-link-tile--shadow');
      } else {
        this.container.classList.remove('c-link-tile--shadow');
      }
    }

    _setColored() {
      if (this.hasAttribute('colored')) {
        this.container.classList.add('c-link-tile--colored');
      } else {
        this.container.classList.remove('c-link-tile--colored');
      }
    }
  }
);
