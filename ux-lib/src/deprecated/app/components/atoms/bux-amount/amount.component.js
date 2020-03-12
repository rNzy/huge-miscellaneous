import BuxClass from '../../../../bux.class';

const styleDefault = require('./amount.styles.default.css');

// const tpl = document.createElement('template');
// tpl.innerHTML = `
// <span class="c-amount">
//   <span class="c-amount__value"></span>
// </span>`;

const tpl = document.createElement('template');
tpl.innerHTML = `
<style>
${String(styleDefault)}
</style>
<span class="js-container c-amount">
  <span class="c-amount__value">
  </span>
</span>
`;

window.ShadyCSS && ShadyCSS.prepareTemplate(tpl, 'bux-amount');

class Amount extends BuxClass {
  static get observedAttributes() {
    return [
      'data-value',
      'data-currency',
      'size',
      'bold',
      'data-period',
      'period-size',
      'align-top',
      'fadein',
      'align-right'
    ];
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    // access an element in the shadowRoot through a .js- prefixed class
    this.container = this.shadowRoot.querySelector('.js-container');
    this._slot = this.shadowRoot.querySelector('slot');
    // this.slot = this.shadowRoot.querySelector('slot');
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

  attributeChangedCallback(name, oldValue) {
    switch (name) {
      case 'data-value':
      case 'data-currency':
        if (this.container) {
          this._updateValue();
        }
        break;
      case 'data-period':
        if (this.container) {
          this._updatePeriod();
        }
        break;
      case 'size':
        if (this.container) {
          this._setSize(oldValue);
        }
        break;
      case 'period-size':
        if (this.container) {
          this._setPeriodSize(oldValue);
        }
        break;
      case 'bold':
        if (this.container) {
          this._setBold();
        }
        break;
      case 'align-top':
        if (this.container) {
          this._setAlignTop();
        }
        break;
      case 'align-right':
        if (this.container) {
          this._setAlignRight();
        }
        break;
      case 'fadein':
        if (this.container) {
          this._setFadeIn();
        }
        break;
    }
  }

  connectedCallback() {
    window.ShadyCSS && ShadyCSS.styleElement(this);

    this._upgradeProperty('data-value');
    this._upgradeProperty('currency');
    this._upgradeProperty('size');
    this._upgradeProperty('bold');
    this._upgradeProperty('period');
    this._upgradeProperty('period-size');
    this._upgradeProperty('align-top');
    this._upgradeProperty('fade-in');
  }

  /**
   * @property
   * @type {string} value / data-value
   */

  get value() {
    return this.getAttribute('data-value');
  }

  set value(value) {
    return this.setAttribute('data-value', value);
  }

  _setValue() {
    this.container.setAttribute('data-value', this.value);
  }

  /**
   * @property
   * @type {string} currency / data-value
   */

  get currency() {
    // default to € euro
    return this.getAttribute('data-currency') || 'EUR';
  }

  set currency(newCurrency) {
    this.setAttribute('data-currency', newCurrency);
  }

  get period() {
    // default to € euro
    return this.getAttribute('data-period') || '';
  }

  set period(newPeriod) {
    this.setAttribute('data-period', newPeriod);
  }

  get size() {
    return this.getAttribute('size');
  }

  set size(newSize) {
    this.setAttribute('size', newSize);
  }

  get periodSize() {
    return this.getAttribute('period-size');
  }

  set periodSize(newPeriodSize) {
    this.setAttribute('period-size', newPeriodSize);
  }

  get alignTop() {
    return (
      this.hasAttribute('align-top') &&
      this.getAttribute('align-top') !== 'false'
    );
  }

  set alignTop(newAlign) {
    const isAlignedTop = Boolean(newAlign);
    if (isAlignedTop) this.setAttribute('align-top', '');
    else this.removeAttribute('align-top');
  }

  get bold() {
    return this.hasAttribute('bold') && this.getAttribute('bold') !== 'false';
  }

  set bold(value) {
    const isBold = Boolean(value);
    if (isBold) this.setAttribute('bold', '');
    else this.removeAttribute('bold');
  }

  get fadeIn() {
    return (
      this.hasAttribute('fadein') && this.getAttribute('fadein') !== 'false'
    );
  }

  set fadeIn(value) {
    const isFadeIn = Boolean(value);
    if (isFadeIn) this.setAttribute('fadein', '');
    else this.removeAttribute('fadein');
  }

  _updateValue() {
    const val = Number(this.value);
    let cleanedValue = this.value;
    if (!isNaN(val)) {
      // eslint-disable-next-line no-undefined
      cleanedValue = `${val.toLocaleString('fr', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: this.currency
      })}`;
      this.shadowRoot.querySelector(
        '.c-amount__value'
      ).innerHTML = cleanedValue;
      if (val < 0) {
        this.container.classList.add('c-amount--negative');
      } else {
        this.container.classList.remove('c-amount--negative');
      }
    }
  }

  _updatePeriod() {
    if (this.period) {
      const periodEl = this.container.querySelector('.c-amount__period');
      if (periodEl === null) {
        const periodElNew = this.shadowRoot.querySelector('.c-amount');

        const periodA11y = document.createElement('span');
        periodA11y.setAttribute('class', 'u-hidden-visually');
        periodA11y.textContent = ' par ' + this.period;

        const periodValue = document.createElement('span');
        periodValue.setAttribute('aria-hidden', 'true');
        periodValue.setAttribute('class', 'c-amount__period');
        periodValue.textContent = this.period;

        periodElNew.appendChild(periodA11y);
        periodElNew.appendChild(periodValue);
      } else {
        periodEl.textContent = this.period;
      }
    }
  }

  _setSize(oldValue) {
    if (oldValue) {
      this.container.classList.remove(`c-amount--${oldValue}`);
    }
    switch (this.size) {
      case 'sm':
      case 'md':
      case 'xl':
      case 'xxl':
      case 'inherit':
        this.container.classList.add('c-amount--' + this.size);
        break;
    }
  }

  _setCurrencySize(oldValue) {
    if (oldValue) {
      this.container.classList.remove(`c-currency--${oldValue}`);
    }
    switch (this.currencySize) {
      case 'sm':
      case 'md':
      case 'xl':
      case 'xxl':
        this.container.classList.add('c-currency--sm' + this.currencySize);
        break;
    }
  }

  _setPeriodSize(oldValue) {
    const periodEl = this.container.querySelector('.c-amount__period');
    if (oldValue) {
      periodEl.classList.remove(`c-period--${oldValue}`);
    }
    switch (this.periodSize) {
      case 'sm':
      case 'md':
      case 'xl':
      case 'xxl':
        periodEl.classList.add('c-period--' + this.periodSize);
        break;
    }
  }

  _setBold() {
    if (this.hasAttribute('bold')) {
      this.container.classList.add('c-amount--bold');
    } else {
      this.container.classList.remove('c-amount--bold');
    }
  }

  _setAlignTop() {
    if (this.hasAttribute('align-top')) {
      this.container.classList.add('c-amount--align-top');
    } else {
      this.container.classList.remove('c-amount--align-top');
    }
  }

  _setAlignRight() {
    if (this.hasAttribute('align-right')) {
      this.container.classList.add('c-amount--align-right');
    } else {
      this.container.classList.remove('c-amount--align-right');
    }
  }

  _setFadeIn() {
    if (this.hasAttribute('fadein')) {
      this.container.classList.add('c-amount--fade-in');
    } else {
      this.container.classList.remove('c-amount-fade-in');
    }
  }
}

window.customElements.define('bux-amount', Amount);
