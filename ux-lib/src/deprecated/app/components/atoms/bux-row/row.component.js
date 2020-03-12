import BuxClass from '../../../../bux.class';
import './row.styles.scss';

customElements.define(
  'bux-row',

  class Row extends BuxClass {
    static get observedAttributes() {
      return [
        'link',
        'radio',
        'data-amount',
        'data-currency',
        'data-date',
        'data-label',
        'data-sublabel'
      ];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    attributeChangedCallback(name, oldVal, newVal) {
      // Already called
      if (!this.isInit) return;

      const camelCaseName = this.toCamelCase(name);
      this[camelCaseName] = newVal;
      switch (name) {
        case 'radio':
          if (this.container) this._setAsRadio();
          break;
        case 'link':
          if (this.container) this._setAsLink();
          break;
        case 'data-amount':
          this._setAmount();
          break;
        case 'data-currency':
          this._setCurrency();
          break;
        case 'data-date':
          this._setDate();
          break;
        case 'data-label':
          this._setLabel();
          break;
        case 'data-sublabel':
          this._setSubLabel();
          break;
      }
    }

    connectedCallback() {
      // Already called
      if (this.isInit) return;

      //this.setAttribute('role', 'listitem');
      this.amount = this.getAttribute('data-amount') || '';
      this.currency = this.getAttribute('data-currency') || '';
      this.date = this.getAttribute('data-date') || '';
      this.label = this.getAttribute('data-label') || '';
      this.sublabel = this.getAttribute('data-sublabel') || '';
      this.link = this.getAttribute('data-link') || '';
      this.a11yLabel = this.getAttribute('a11y-label') || '';
      this.noborderbottom =
        this.hasAttribute('noborderbottom') &&
        this.getAttribute('noborderbottom') !== 'false';
      this.nopaddingleft =
        this.hasAttribute('nopaddingleft') &&
        this.getAttribute('nopaddingleft') !== 'false';
      this.nopaddingright =
        this.hasAttribute('nopaddingright') &&
        this.getAttribute('nopaddingright') !== 'false';

      this.tpl = document.createElement('template');
      this.tpl.innerHTML = this.template();

      this.slotsWrap = this.tpl.content.querySelector('.slot');
      while (this.children.length > 0) {
        this.slotsWrap.appendChild(this.children[0]);
      }

      this.container = this.tpl.content.querySelector('.c-row');
      this._setAsLink();
      this._setAsRadio();

      this.appendChild(this.tpl.content);
      this.isInit = true;
    }

    renderDate() {
      if (!this.date) return '';
      return `
      <div class="c-row__cell c-row__cell--date">
        ${this.date}
      </div>
      `;
    }

    _setDate() {
      if (!this.date) return;
      const dateEl = this.querySelector('.c-row__cell--date');
      if (dateEl) dateEl.innerHTML = this.date;
    }

    renderLabel() {
      if (!this.label) return '';
      return `<div class="c-row__label">${this.label}</div>`;
    }

    _setLabel() {
      if (!this.label) return;
      const labelEl = this.querySelector('.c-row__label');
      if (labelEl) labelEl.innerHTML = this.label;
    }

    // _setLabel() {
    //   const labelEl = this.querySelector('.c-row__label');
    //   labelEl.innerHTML = this.getAttribute('data-label');
    // }

    renderSubLabel() {
      if (!this.sublabel) return '';
      return `<div class="c-row__sublabel">${this.sublabel}</div>`;
    }

    _setSubLabel() {
      if (!this.sublabel) return;
      const subLabelEl = this.querySelector('.c-row__sublabel');
      if (subLabelEl) subLabelEl.innerHTML = this.sublabel;
    }

    renderAmount() {
      if (!this.amount) return '';
      return `
        <div class="c-row__cell c-row__cell--amount">
          <bux-amount data-value=${this.amount} ${
        this.currency ? `data-currency="${this.currency}"` : ''
      }></bux-amount>
        </div>
      `;
    }

    _setAmount() {
      if (!this.amount) return;
      const amountEl = this.querySelector('.c-row__cell--amount bux-amount');
      if (amountEl) amountEl.setAttribute('data-value', this.amount);
    }

    _setCurrency() {
      if (!this.currency) return;
      const amountEl = this.querySelector('.c-row__cell--amount bux-amount');
      if (amountEl) amountEl.setAttribute('data-currency', this.currency);
    }

    renderLink() {
      if (!this.link) return '';

      let alabel = '';
      if (this.a11yLabel) {
        alabel = 'aria-label="' + this.a11yLabel + '"';
      } else if (this.label) {
        alabel = 'aria-label="Voir le détail de : ' + this.label + '"';
      }

      return `
        <bux-svg data-icon="arrow" data-class="c-svg c-row__icon-link"></bux-svg>
        <a class="c-row__anchor" href="${this.link}" ${alabel}></a>
      `;
    }

    _setAsLink() {
      if (this.hasAttribute('link') && !this.hasAttribute('data-link')) {
        const icon = document.createElement('bux-svg');
        icon.setAttribute('data-icon', 'arrow');
        icon.setAttribute('data-class', 'c-svg c-row__icon-link');

        this.container.classList.add('c-row--link');
        this.container.appendChild(icon);
      }
    }

    renderRadio() {
      if (this.hasAttribute('radio') && this.getAttribute('radio') != 'false') {
        const ay11Label = this.label + this.sublabel;
        const idPrefixe =
          'bux-radio-' + (Math.floor(Math.random() * 10000) + 2);

        return `
      <div class="c-row__cell--input-wrap">
        <input id="${idPrefixe}" type="radio" class="c-row__cell--input" name=${this.getAttribute(
          'radio'
        )}></input>
        <label for=${idPrefixe} class="c-row__cell--label" >
          <span class="accessi">${ay11Label}</span>
        </label>
      </div>
      `;
      }
      return '';
    }

    _setAsRadio() {
      if (this.hasAttribute('radio') && !this.hasAttribute('data-radio')) {
        this.container.classList.add('c-row--radio');
        this.addEventListener('click', () => {
          const radio = this.querySelector('.c-row__cell--input');
          if (radio && !radio.checked) radio.checked = true; // modifier ici pour ne pas permettre la sélection quand :checked ?
        });
      }
    }

    template() {
      return `
      <div class="c-row ${this.radio ? 'c-row--radio' : ''} ${
        this.link ? 'c-row--link' : ''
      } ${this.noborderbottom ? 'c-row--noborderbottom' : ''} ${
        this.nopaddingleft ? 'u-nopaddingleft' : ''
      } ${this.nopaddingright ? 'u-nopaddingright' : ''}">
        ${this.renderRadio()}
        ${this.renderDate()}
        <div class="c-row__cell c-row__cell--content">
            ${this.renderLabel()}
            ${this.renderSubLabel()}
          <div class="slot"></div>
        </div>
        ${this.renderAmount()}
        ${this.renderLink()}
      </div>
      `;
    }
  }
);
