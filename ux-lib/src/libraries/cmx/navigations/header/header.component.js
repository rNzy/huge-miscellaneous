import HeaderBase from '../../../../core/components/navigations/header/header.component';
import styleDefault from './header.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<header class="c-header c-header--desktop">
  <slot name="header-logo"></slot>
  <nav class="c-header__nav">
    <slot name="left"></slot>
    <div class="c-header__nav-right">
      <slot name="right"></slot>
    </div>
  </nav>
</header>
<header class="c-header c-header--mobile">
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
