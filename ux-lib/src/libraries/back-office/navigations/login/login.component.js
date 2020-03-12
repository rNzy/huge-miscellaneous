import MenuIconBase from '../../../../core/components/navigations/menu/menu-icon.component';

import './login.svg';

import styleDefault from './login.style.css';

const tpl = document.createElement('template');
tpl.innerHTML =
  '<div class="c-logo"><slot></slot><ux-svg class="c-logo--svg" icon="login"></ux-svg></div>';
/**
 *
 *
 * @class Login
 * @extends {MenuIconBase}
 *
 * @slot - default
 */
class Login extends MenuIconBase {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-login', Login);
