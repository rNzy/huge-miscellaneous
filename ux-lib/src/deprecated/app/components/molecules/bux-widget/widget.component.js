import BuxClass from '../../../../bux.class';
import './widget.styles.scss';

customElements.define(
  'bux-widget',

  class Widget extends BuxClass {
    static get observedAttributes() {
      return ['data-label'];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    attributeChangedCallback(name) {
      switch (name) {
        case 'data-label':
          this._updateLabel();
          break;
      }
    }

    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;

      this.classList.add('c-widget');
      this._setLabel();
    }

    set label(newLabel) {
      this.setAttribute('data-label', newLabel);
    }

    get label() {
      return this.getAttribute('data-label');
    }

    _setLabel() {
      if (!this.label) return;
      this.labelCont = document.createElement('h2');
      this.labelCont.classList.add('c-widget__label');
      this.labelCont.textContent = this.label;
      this.insertBefore(this.labelCont, this.firstChild);
    }

    _updateLabel() {
      if (!this.isInit || this.label) return;
      if (!this.labelCont) this._setLabel();
      this.labelCont.textContent = this.label;
    }
  }
);
