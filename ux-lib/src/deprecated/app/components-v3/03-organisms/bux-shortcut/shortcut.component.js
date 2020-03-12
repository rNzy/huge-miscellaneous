import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-shortcut-wrap" aria-hidden="true">
  <nav class="c-shortcut-nav">
    <ul class="c-shortcut-ul">
    </ul>
  </nav>
</div>`;

export default class Shortcut extends BaseShadowComponent {
  static get properties() {
    return {
      isOpenMobile: { type: 'boolean' },
      hasScrollEd: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  set data(newData) {
    if (!newData) return;

    this.ul.innerHTML = '';

    const tpl = document.createElement('template').content;
    const length = newData.length - 1;

    newData.forEach((item, i) => {
      tpl.appendChild(this.renderOneItem(item, i === 0, i === length));
    });

    this.ul.appendChild(tpl);
  }

  constructor() {
    super();

    // Here you can select element
    this.ul = this.$.querySelector('.c-shortcut-ul');
    this.wrap = this.$.querySelector('.c-shortcut-wrap');
    this.nav = this.$.querySelector('.c-shortcut-nav');

    // Scroll event for mobile
    this.onScrollEvent = this.onScrollEvent.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Add scrool event for open in mobile when user
    // start to scrool
    window.addEventListener('scroll', this.onScrollEvent);
  }

  onScrollEvent() {
    window.removeEventListener('scroll', this.onScrollEvent);
    this.setOpenMobile();
  }

  setOpenMobile() {
    this.ul.classList.add('is-open-mobile');
    this.nav.classList.add('is-open-mobile');
    this.wrap.classList.add('is-open-mobile');
    this.isOpenMobile = true;
  }

  ////////////////// Helper
  renderOneItem(item, first = false, last = false) {
    const li = document.createElement('li');
    li.classList.add('c-shortcut-li');

    if (first) li.classList.add('c-shortcut-li--first');
    if (last) li.classList.add('c-shortcut-li--last');

    li.innerHTML = `
      <a class="c-shortcut-a" href="${item.path}">
        ${
          item.icon
            ? `
            <bux2-svg icon="${item.icon}" class="c-icon c-shortcut-icon"></bux2-svg>
            `
            : ''
        }
        <span class="c-shortcut-label">${item.label}</span>
      </a>
    `;

    return li;
  }
}
