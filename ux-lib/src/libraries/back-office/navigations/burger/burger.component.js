import BurgerBase from '../../../../core/components/navigations/burger/burger.component';
import styleDefault from './burger.style.css';

class Burger extends BurgerBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-burger', Burger);
