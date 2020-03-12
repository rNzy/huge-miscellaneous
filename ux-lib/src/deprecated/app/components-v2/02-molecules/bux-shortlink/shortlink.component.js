const styleDefault = require('./shortlink.styles.default.css');

const tpl = document.createElement('template');
tpl.innerHTML = `
<style>
${String(styleDefault)}
</style>
<div class="c-shortlink js-container">
  <div class="c-shortlink__icon">
    <slot name="icon"></slot>
  </div>
  <div class="c-shortlink__label">
    <slot name="label"></slot>
  </div>
  <slot name="link"></slot>
</div>
`;

window.ShadyCSS && ShadyCSS.prepareTemplate(tpl, 'bux2-shortlink');

class Shortlink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(tpl.content.cloneNode(true));
  }

  connectedCallback() {
    window.ShadyCSS && ShadyCSS.styleElement(this);
  }
}

window.customElements.define('bux2-shortlink', Shortlink);
