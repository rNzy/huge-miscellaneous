import HeaderBase from '../../../../core/components/navigations/header/header.component';
import styleDefault from './header-pdt.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<header class="c-header">
  <slot></slot>
</header>`;

class Header extends HeaderBase {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-header', Header);
