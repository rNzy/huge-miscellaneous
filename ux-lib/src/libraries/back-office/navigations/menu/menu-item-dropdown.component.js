import MenuItemDropDownBase from '../../../../core/components/navigations/menu/menu-item-dropdown.component';
import styleDefault from './menu-item-dropdown.style.css';

export default class MenuItemDropDown extends MenuItemDropDownBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-menu-item-dropdown', MenuItemDropDown);
