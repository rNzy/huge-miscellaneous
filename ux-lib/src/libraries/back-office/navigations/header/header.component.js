import HeaderBase from '../../../../core/components/navigations/header/header.component';
import styleDefault from './header.style.css';

class Header extends HeaderBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-header', Header);
