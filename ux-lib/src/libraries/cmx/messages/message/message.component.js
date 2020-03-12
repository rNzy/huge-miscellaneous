import MessageBase from '../../../../core/components/messages/message/message.component';
import styleDefault from './message.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-message js-container">
  <div class="c-message-content"><slot ></slot></div>
</div>
`;
/**
 * Display an alert message
 */
class Message extends MessageBase {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.iconName = '';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'type') this._setIcon();
  }

  _setIcon() {
    const iconEl = document.createElement('ux-svg');

    switch (this.type) {
      case 'info':
        this.iconName = 'information';
        break;
      case 'warning':
        this.iconName = 'warning';
        break;
      case 'error':
        return; // no icon to prepend here
    }
    iconEl.setAttribute('icon', this.iconName);
    iconEl.classList.add('c-message__icon');
    this.container.prepend(iconEl);
  }
}

customElements.define('ux-message', Message);
