/* eslint-disable radix */
import './chat.styles.scss';

const template = document.createElement('template');

template.innerHTML = `
<style>
  .c-chat {
    font-family: 'Maven pro', sans-serif;
  }

  .c-chat__date {
    text-align: center;
    display: block;
    margin-bottom: 10px;
  }

  .c-chat__list {
    list-style: none;
    padding-left: 60px;
    padding-bottom: 10px;
    display: flex;
    flex-flow: column nowrap;
  }

  ::slotted(.grid-item) {
    display: table;
  }


</style>
<section class="c-chat">
  <small class="c-chat__date"></small>
  <div class="c-chat__list">
    <slot></slot>
  </div>
</section>
`;

window.ShadyCSS && ShadyCSS.prepareTemplate(template, 'bux-chat');

class Chat extends HTMLElement {
  static get observedAttributes() {
    return ['data-date'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._defaultSlot = this.shadowRoot.querySelector('slot');
    this._defineItems();
  }

  attributeChangedCallback(name) {
    switch (name) {
      case 'data-date':
        this._setDate();
        break;
    }
  }

  connectedCallback() {
    window.ShadyCSS && ShadyCSS.styleElement(this);
  }

  get date() {
    return this.getAttribute('data-date');
  }

  set date(value) {
    this.setAttribute('data-date', value);
  }

  // get slotted content
  _allItems() {
    return Array.from(this.children);
  }

  // set item classes
  _defineItems() {
    const items = this._allItems();
    items.forEach(item => {
      if (!item.classList.contains('c-chat__item')) {
        item.classList.add('c-chat__item');
      }
    });
  }

  _setDate() {
    const target = this.shadowRoot.querySelector('.c-chat__date');
    target.textContent = this.date;
  }
}

customElements.define('bux-chat', Chat);
