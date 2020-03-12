import BuxClass from '../../../../bux.class';
import './loader.styles.scss';

import debounce from 'lodash.debounce';

customElements.define(
  'bux-loader',
  class Loader extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
      this.oldState = false;
    }

    static get observedAttributes() {
      return ['loading'];
    }

    connectedCallback() {
      if (this.isInit) return;
      this.innerHTML = `
      <div class="c-loader" role="status" aria-busy="true" aria-live="polite">
        <div class="c-loader__wrapper">
          <bux-progress-ring loading></bux-progress-ring>
        </div>
      </div>`;
      this.container = this.querySelector('.c-loader');
      this._toggleLoading(this.loading);
      this.isInit = true;
    }

    attributeChangedCallback() {
      if (!this.isInit) return;
      debounce(() => this._toggleLoading(this.loading), 150)();
    }

    set loading(value) {
      const isLoading = Boolean(value);
      if (isLoading) this.setAttribute('loading', '');
      else this.removeAttribute('loading');
    }

    get loading() {
      return (
        this.hasAttribute('loading') && this.getAttribute('loading') !== 'false'
      );
    }

    _toggleLoading(loading) {
      if (loading) {
        this.container.style.display = '';
        setTimeout(() => {
          this.container.classList.add('is-loading');
        }, 250); // nb this time should be the same than animation in css
      } else {
        this.container.classList.remove('is-loading');
        setTimeout(() => {
          this.container.style.display = 'none';
        }, 250); // nb this time should be the same than animation in css
      }
    }
  }
);
