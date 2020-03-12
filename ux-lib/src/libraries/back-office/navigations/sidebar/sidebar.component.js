import SidebarBase from '../../../../core/components/navigations/sidebar/sidebar.component';
import styleDefault from './sidebar.style.css';

class Sidebar extends SidebarBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-sidebar', Sidebar);
