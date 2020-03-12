import Notification from '../notification.component';

import styleDefault from './css/notification.style.css';

class CmxNotification extends Notification {
  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-notification', CmxNotification);
