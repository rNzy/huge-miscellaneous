import styleDefault from './notification.style.css';

/**
 *
 * @export
 * @class NotificationBase
 *
 * @prop {Number} number - nombre de notification
 *
 */

const template = document.createElement('div');
template.classList.add('c-notification');

export default function NotificationMixin(base) {
  class NotificationMixin extends base {
    static get properties() {
      return {
        notification: { type: 'number' }
      };
    }

    static get style() {
      return styleDefault.toString();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (name === 'notification') {
        if (this.notification && this.notification != 0) {
          this.container.appendChild(template);
          template.textContent = this.notification;
        } else if (this.notification == 0) {
          const tpl = this.$.querySelector('.c-notification');
          if (tpl) {
            tpl.remove();
          }
        }
      }
    }
  }

  return NotificationMixin;
}
