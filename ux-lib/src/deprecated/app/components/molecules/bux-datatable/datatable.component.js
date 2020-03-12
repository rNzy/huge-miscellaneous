import BuxClass from '../../../../bux.class';
const styles = require(`./datatable.styles.${uxEfs}.css`);

const tpl = document.createElement('template');
tpl.innerHTML = `
<style>${styles}</style>
<div role="table" aria-describedby="caption_description" class="c-datatable">
  <div id="caption_description" class="c-datatable__caption"></div>
  <div class="c-datatable__thead" role="rowgroup"><!-- /thead -->
      <slot name="thead"></slot>
  </div>
  <div class="c-datatable__tbody" role="rowgroup"><!-- /tbody -->
    <slot name="tbody"></slot>
  </tbody>
</div>
`;

window.ShadyCSS && ShadyCSS.prepareTemplate(tpl, 'bux-datatable');

customElements.define(
  'bux-datatable',

  class Datatable extends BuxClass {
    static get observedAttributes() {
      return ['data-caption'];
    }

    constructor() {
      super();
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(tpl.content.cloneNode(true));
      this.captionElement = this.shadowRoot.querySelector(
        '#caption_description'
      );
    }

    connectedCallback() {
      window.ShadyCSS && ShadyCSS.styleElement(this);
      this._upgradeProperty('caption');
    }

    /*eslint-disable */
    _upgradeProperty(prop) {
      if (this.hasOwnProperty(prop)) {
        const value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    }
    /*eslint-enable */

    attributeChangedCallback(name) {
      switch (name) {
        case 'data-caption':
          this.captionElement.textContent = this.caption;
      }
    }

    get caption() {
      return this.getAttribute('data-caption');
    }

    set caption(value) {
      this.setAttribute('data-caption', value);
    }
  }
);
