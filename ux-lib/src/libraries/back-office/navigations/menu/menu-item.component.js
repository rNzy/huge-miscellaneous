import MenuItemBase from '../../../../core/components/navigations/menu/menu-item.component';
import styleDefault from './menu-item.style.css';

export default class MenuItem extends MenuItemBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-menu-item', MenuItem);
