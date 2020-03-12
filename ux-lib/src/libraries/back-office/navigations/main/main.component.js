import MainBase from '../../../../core/components/navigations/main/main.component';
import styleDefault from './main.style.css';

class Main extends MainBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-main', Main);
