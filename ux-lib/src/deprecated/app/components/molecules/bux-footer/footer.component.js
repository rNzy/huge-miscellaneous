import BuxClass from '../../../../bux.class';
import './footer.styles.scss';

customElements.define(
  'bux-footer',

  class Footer extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
      this._data = null;
    }

    get data() {
      return this._data;
    }

    set data(newVal) {
      this._data = newVal;
      if (!this.isInit) return;
      this.setData();
    }

    connectedCallback() {
      const isAuth = this.getAttribute('type') === 'auth';

      this.innerHTML = `
      <footer class="c-footer ${
        isAuth ? 'c-footer__auth' : ''
      }" role="contentinfo">
        <bux-nav-bar type="${isAuth ? 'footerauth' : 'footer'}"></bux-nav-bar>
      </footer>
      `;

      this.navBar = this.querySelector('bux-nav-bar');

      this.setData();
      this.isInit = true;
    }

    setData() {
      if (!this._data) return;
      this.navBar.data = this._data;
    }
  }
);
