import ListBase from '../../../../core/components/liste-tables/list/list.component';
import styleDefault from './list.style.css';

/**
 * This is a simple list
 */
class List extends ListBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-list', List);
