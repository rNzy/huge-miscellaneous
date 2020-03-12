import BuxClass from '../../../../bux.class';
import './user-card.styles.scss';

const tpl = document.createElement('template');

if (uxEfs === 'azb') {
  tpl.innerHTML = `
  <div class="c-user-card">
    <bux-svg data-icon="user-circle" data-class="c-icon--huge"></bux-svg>
  </div>
`;
} else {
  tpl.innerHTML = `
  <div class="c-user-card">
    <div class="c-user-card__img">
      <bux2-image src="profil.png" aria-hidden="true" width="82" height="82"></bux2-image>
    </div>
  </div>
  `;
}

customElements.define(
  'bux-user-card',

  class Widget extends BuxClass {
    static get observedAttributes() {
      return ['data-label', 'data-sublabel', 'profil'];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;
      const nTpl = tpl.content.cloneNode(true);
      this.container = nTpl.querySelector('.c-user-card');

      this._upgradeProperty('label');
      this._upgradeProperty('sublabel');
      this._upgradeProperty('profil');

      this._setLabel();
      this._setSubLabel();
      this._setProfil();

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
          if (this.container) this._setLabel();
          break;
        case 'data-sublabel':
          if (this.container) this._setSubLabel();
          break;
        case 'profil':
          if (this.container) this._setProfil();
          break;
      }
    }

    set label(value) {
      this.setAttribute('data-label', value);
    }

    get label() {
      return this.getAttribute('data-label');
    }

    set subLabel(value) {
      this.setAttribute('data-sublabel', value);
    }

    get subLabel() {
      return this.getAttribute('data-sublabel');
    }

    get profil() {
      return this.hasAttribute('profil');
    }

    set profil(value) {
      const isProfil = Boolean(value);
      if (isProfil) this.setAttribute('profil', '');
      else this.removeAttribute('profil');
    }

    _setLabel() {
      if (this.container.querySelector('.c-user-card__label')) {
        this.container.querySelector(
          '.c-user-card__label'
        ).textContent = this.label;
      } else {
        const labelEl = document.createElement('div');
        labelEl.classList.add('c-user-card__label');
        labelEl.textContent = this.label;
        this.container.appendChild(labelEl);
      }
    }

    _setSubLabel() {
      if (this.container.querySelector('.c-user-card__sublabel')) {
        this.container.querySelector(
          '.c-user-card__sublabel'
        ).textContent = this.subLabel;
      } else {
        const sublabelEl = document.createElement('small');
        sublabelEl.classList.add('c-user-card__sublabel');
        sublabelEl.textContent = this.subLabel;
        this.container.appendChild(sublabelEl);
      }
    }

    _setProfil() {
      if (this.profil === true)
        this.container.classList.add('c-user-card--profil');
      else this.container.classList.remove('c-user-card--profil');
    }
  }
);
