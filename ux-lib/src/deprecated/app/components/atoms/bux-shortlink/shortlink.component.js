import BuxClass from '../../../../bux.class';

customElements.define(
  'bux-shortlink',

  class ShortLink extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    connectedCallback() {
      if (this.isInit) return;

      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();
      this.appendChild(tpl.content);

      if (typeof this.data.path === 'function') {
        const link = this.getElementsByTagName('a')[0];
        link.href = window.location + '#';
        link.onclick = this.data.path;
      }
    }

    template() {
      return `
        <a class="c-widget-nav__link" href="${this.data.path}">
          <bux-svg data-icon="${
            this.data.icon
          }" data-class="c-widget-nav__icon"></bux-svg>
          <div class="c-widget-nav__link-text">${this.data.label}</div>
        </a>
        `;
    }
  }
);
