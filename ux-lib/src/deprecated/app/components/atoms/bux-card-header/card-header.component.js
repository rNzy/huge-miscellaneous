import BuxClass from '../../../../bux.class';
import './card-header.styles.scss';

const tpl = document.createElement('template');
tpl.innerHTML = `
  <div class="c-card__head">
    <h3 class="c-card__title"></h3>
  </div>`;

customElements.define(
  'bux-card-header',

  class CardHeader extends BuxClass {
    static get observedAttributes() {
      return ['left'];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      const nTpl = tpl.content.cloneNode(true);
      this.wrapSlot = nTpl.querySelector('.c-card__title');
      this.container = nTpl.querySelector('.c-card__head');
      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.wrapSlot.appendChild(this.childNodes[0]);
      }

      this.setLeft();
      if (this.hasAttribute('data-toast')) {
        this.setToast();
      }
      // Insert your element in the dom
      this.appendChild(nTpl);
      if (this.hasAttribute('data-toast')) {
        const btnEl = this.querySelector('.btn-selector');
        btnEl.setAttribute('aria-label', "Afficher l'information relative");
      }
    }

    attributeChangedCallback() {
      if (!this.isInit) return;
      this.setLeft();
    }

    get left() {
      return this.hasAttribute('left') && this.getAttribute('left') !== 'false';
    }

    set left(value) {
      const isLeft = Boolean(value);
      if (isLeft) this.setAttribute('left', '');
      else this.removeAttribute('left');
    }

    setToast() {
      this.container.classList.add('c-card__head--toast');

      const toastBtn = document.createElement('bux-btn');
      const toastId = this.getAttribute('data-toast');
      toastBtn.setAttribute('type', 'svg');
      toastBtn.setAttribute('data-icon', 'help');
      toastBtn.setAttribute('id', toastId);
      this.container.appendChild(toastBtn);
    }

    setLeft() {
      if (this.hasAttribute('left')) {
        this.wrapSlot.classList.add('c-card__title--left');
      } else {
        this.wrapSlot.classList.remove('c-card__title--left');
      }
    }
  }
);
