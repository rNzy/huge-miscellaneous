import BuxClass from '../../../../bux.class';
import './row-simple.styles.scss';

customElements.define(
  'bux-row-simple',

  class RowSimple extends BuxClass {
    static get observedAttributes() {
      return ['outline', 'data-editable', 'data-editable-label'];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      const tpl = document.createElement('template');
      tpl.innerHTML = '<div class="c-row-simple"></div>';
      this.container = tpl.content.querySelector('.c-row-simple');

      if (this.children && this.children[1])
        this.children[1].classList.add('c-row-simple-right');

      while (this.children.length > 0) {
        this.container.appendChild(this.children[0]);
      }

      this._setType();
      this._setOutline();
      this._setEditableLink();
      this.appendChild(tpl.content);
    }

    attributeChangedCallback(name) {
      if (!this.isInit) return;
      switch (name) {
        case 'outline':
          this._setOutline();
          break;
        case 'data-editable':
          this._setEditableLink();
          break;
      }
    }

    get outline() {
      return (
        this.hasAttribute('outline') && this.getAttribute('outline') !== 'false'
      );
    }

    set outline(value) {
      const isOutline = Boolean(value);
      if (isOutline) this.setAttribute('outline', '');
      else this.removeAttribute('outline');
    }

    _setOutline() {
      if (this.hasAttribute('outline')) {
        this.container.classList.add('c-row-simple--outline');
      } else {
        this.container.classList.remove('c-row-simple--outline');
      }
    }

    get editableLink() {
      return this.getAttribute('data-editable');
    }

    set editableLink(value) {
      this.setAttribute('data-editable', value);
    }

    get editableLinkLabel() {
      return this.getAttribute('data-editable-label');
    }

    set editableLinkLabel(value) {
      this.setAttribute('data-editable-label', value);
    }

    _setEditableLink() {
      if (this.hasAttribute('data-editable')) {
        const editableLinkTpl = `
          <a href="${this.editableLink}" title="${this.editableLinkLabel}">
            <bux-svg data-icon="pen"></bux-svg>
          </a>
        `;
        const editableLinkEl = document.createElement('div');
        editableLinkEl.innerHTML = editableLinkTpl;
        editableLinkEl.classList.add('c-row-simple__edit');
        this.container.appendChild(editableLinkEl);
        this.container.classList.add('c-row-simple--edit');
      }
    }

    _setType() {
      this.type = this.getAttribute('type');

      switch (this.type) {
        case 'small':
          this.container.classList.add('c-row-simple--small');
          break;
        case 'background':
          this.container.classList.add('c-row-simple--background');
          break;
      }
    }
  }
);
