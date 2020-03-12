import MessageBase from '../../../../core/components/messages/message/message.component';
import styleDefault from './message.style.css';

/**
 * Display an alert message
 */
class Message extends MessageBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-message', Message);
