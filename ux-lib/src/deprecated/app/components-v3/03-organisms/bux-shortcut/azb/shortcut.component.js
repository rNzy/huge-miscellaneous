import Shortcut from '../shortcut.component';

import styleDefault from './shortcut.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-shortcut-wrap" aria-hidden="true">
  <nav class="c-shortcut-nav">
    <ul class="c-shortcut-ul">
    </ul>
    <button class="c-shortcut-btn">
      <bux2-svg icon="cross" size="shortcut" class="c-shorcut-btn-svg"></bux2-svg>
    </button>
  </nav>
</div>`;

class AZBShortcut extends Shortcut {
  static get properties() {
    return {
      isOpenDesktop: { type: 'boolean' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Start open on desktop
    this.setOpenDesktop();

    // Close it on desktop after 1 second
    setTimeout(() => {
      this.setOpenDesktop();
    }, 1000);

    // Add listener to the btn on desktop to close/open it
    this.$.querySelector('.c-shortcut-btn').addEventListener('click', () => {
      this.setOpenDesktop();
    });
  }

  setOpenDesktop() {
    if (this.isOpenDesktop) {
      this.ul.classList.remove('is-open-desktop');
      this.nav.classList.remove('is-open-desktop');
      this.wrap.classList.remove('is-open-desktop');
      this.isOpenDesktop = false;
    } else {
      this.ul.classList.add('is-open-desktop');
      this.nav.classList.add('is-open-desktop');
      this.wrap.classList.add('is-open-desktop');
      this.isOpenDesktop = true;
    }
  }
}

customElements.define('bux-shortcut', AZBShortcut);
