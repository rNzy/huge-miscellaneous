import DateBase from '../../../../core/components/typography/date/date.component.js';
import styleDefault from './date.style.css';

/**
 * @class Date
 * @extends DateBase
 */
class Date extends DateBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-date', Date);
