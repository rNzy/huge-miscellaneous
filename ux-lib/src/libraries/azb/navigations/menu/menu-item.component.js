import MenuItemBase from '../../../../core/components/navigations/menu/menu-item.component';

export default class MenuItem extends MenuItemBase {
  constructor() {
    super();
    this.iconSize = 'sm';
  }
}

customElements.define('ux-menu-item', MenuItem);
