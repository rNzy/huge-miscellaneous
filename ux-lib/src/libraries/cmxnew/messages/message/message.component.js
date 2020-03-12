import MessageBase from '../../../../core/components/messages/message/message.component';
import styleDefault from './message.style.css';

/**
 * Composant affichant un message.
 */
class Message extends MessageBase {
  static get style() {
    return styleDefault.toString();
  }

  _setType() {
    this._slots[0].innerHTML = `<ux-svg icon="${this.type}"></ux-svg>`;
    this.container.classList.add(`c-message--${this.type}`);
  }
}

customElements.define('ux-message', Message);
