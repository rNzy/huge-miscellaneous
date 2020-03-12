import BuxClass from '../../../../bux.class';
import './card-information.styles.scss';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-card-info">
  <img class="c-card-info__img" src="" alt="">
  <div class="c-card-info__container"></div>
  <a class="c-card-info__path" href="" title="Accéder au détail de la carte" aria-label="accéder au détail de la carte"></a>
</div>

`;

customElements.define(
  'bux-card-information',

  class CardInformation extends BuxClass {
    static get observedAttributes() {
      return [
        'data-label',
        'data-holder',
        'data-number',
        'data-image-path',
        'data-detail-path'
      ];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      const nTpl = tpl.content.cloneNode(true);
      this.infoContainer = nTpl.querySelector('.c-card-info__container');
      this.imgEl = nTpl.querySelector('.c-card-info__img');
      this.detailLinkEl = nTpl.querySelector('.c-card-info__path');

      this._upgradeProperty('label');
      this._upgradeProperty('holder');
      this._upgradeProperty('number');
      this._upgradeProperty('imagePath');
      this._upgradeProperty('detailPath');

      this._setLabel();
      this._setHolder();
      this._setNumber();
      this._setImagePath();
      this._setDetailPath();

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
        case 'data-label':
          if (this.infoContainer) this._updateLabel();
          break;
        case 'data-holder':
          if (this.infoContainer) this._updateHolder();
          break;
        case 'data-number':
          if (this.infoContainer) this._updateNumber();
          break;
        case 'data-image-path':
          if (this.imgEl) this._setImagePath();
          break;
        case 'data-detail-path':
          if (this.detailLinkEl) this._setDetailPath();
          break;
      }
    }

    set label(value) {
      this.setAttribute('data-label', value);
    }

    get label() {
      return this.getAttribute('data-label');
    }

    set holder(value) {
      this.setAttribute('data-holder', value);
    }

    get holder() {
      return this.getAttribute('data-holder');
    }

    set number(value) {
      this.setAttribute('data-number', value);
    }

    get number() {
      return this.getAttribute('data-number');
    }

    set imagePath(value) {
      this.setAttribute('data-image-path', value);
    }

    get imagePath() {
      return this.getAttribute('data-image-path');
    }

    set detailPath(value) {
      this.setAttribute('data-detail-path', value);
    }

    get detailPath() {
      return this.getAttribute('data-detail-path');
    }

    _setLabel() {
      if (this.label && this.label !== 'undefined') {
        const labelEl = document.createElement('div');
        labelEl.classList.add('c-card-info__label');
        labelEl.textContent = this.label;
        this.infoContainer.appendChild(labelEl);
      }
    }

    _updateLabel() {
      const labelEl = this.querySelector('.c-card-info__label');
      if (labelEl) {
        labelEl.textContent = this.label;
      }
    }

    _setHolder() {
      if (this.holder && this.holder !== 'undefined') {
        const holderEl = document.createElement('div');
        holderEl.classList.add('c-card-info__holder');
        holderEl.textContent = this.holder;
        this.infoContainer.appendChild(holderEl);
      }
    }

    _updateHolder() {
      const holderEl = this.querySelector('.c-card-info__holder');
      if (holderEl) {
        holderEl.textContent = this.holder;
      }
    }

    _setNumber() {
      if (this.number && this.number !== 'undefined') {
        const numberEl = document.createElement('div');
        numberEl.classList.add('c-card-info__number');
        numberEl.textContent = this.number;
        this.infoContainer.appendChild(numberEl);
      }
    }

    _updateNumber() {
      const numberEl = this.querySelector('.c-card-info__number');
      if (numberEl) {
        numberEl.textContent = this.number;
      }
    }

    _setImagePath() {
      if (this.imagePath && this.imagePath !== 'undefined') {
        this.imgEl.setAttribute('src', this.imagePath);
      }
    }

    _setDetailPath() {
      if (this.detailPath && this.detailPath !== 'undefined') {
        this.detailLinkEl.setAttribute('href', this.detailPath);
      }
    }
  }
);
