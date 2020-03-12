import BuxClass from '../../../../bux.class';
import './message.styles.scss';

customElements.define(
  'bux-message',
  class Message extends BuxClass {
    constructor() {
      super();
      this.type = 'info';
      this.isInit = false;
    }

    connectedCallback() {
      // this.isInit is important because
      // if the element is move in the dom.
      // It will be call two times and the
      // html will be strange ;)
      if (this.isInit) return;

      // Get message type
      // this.icon = this.setMessage(this.type);
      this.type = this.getAttribute('type') || this.type;

      // Get good icon and class for the message type
      this.setMessage(this.type);

      // Create a template
      this.tpl = document.createElement('template');
      this.tpl.innerHTML = this.template();

      // Select the div in order to put inside slots
      // Add slots to template
      this.wrap = this.tpl.content.querySelector('.c-message__content');

      while (this.children.length > 0) {
        this.wrap.appendChild(this.children[0]);
      }

      // Add all nodes to the WC
      this.appendChild(this.tpl.content);

      this.isInit = true;
    }

    setMessage(type) {
      if (
        uxEfs === 'cmb' ||
        uxEfs === 'cmmc' ||
        uxEfs === 'cmso' ||
        uxEfs === 'cmbpro' ||
        uxEfs === 'cmmcpro' ||
        uxEfs === 'cmsopro' ||
        uxEfs === 'abei'
      ) {
        switch (type) {
          case 'warning':
            this.icon = 'warning';
            this.class = `c-message--${this.type}`;
            break;
          case 'info':
            this.icon = 'information';
            this.class = `c-message--${this.type}`;
            break;
          case 'error':
            this.icon = 'cross-error';
            this.class = `c-message--${this.type}`;
            break;
          case 'alert':
            this.class = `c-message--${this.type}`;
            break;
        }
      } else if (uxEfs === 'azb') {
        switch (type) {
          case 'error':
            this.icon = 'exclamation-triangle';
            this.class = `c-message-info c-message-info--${this.type}`;
            break;
          case 'info':
            this.icon = 'info-circle';
            this.class = `c-message-info c-message-info--${this.type}`;
            break;
          case 'success':
            this.icon = 'check-circle';
            this.class = `c-message-info c-message-info--${this.type}`;
            break;
        }
      }
    }

    template() {
      return `
        <div class="c-message ${this.class}" role="alert" aria-live="assertive">

        ${
          this.icon
            ? `
        <bux-svg data-icon="${this.icon}" data-class="c-icon c-message__icon"></bux-svg>
        `
            : ''
        }
          <div class="c-message__content"></div>
        </div>
      `;
    }
  }
);
