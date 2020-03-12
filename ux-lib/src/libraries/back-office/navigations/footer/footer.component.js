import FooterBase from '../../../../core/components/navigations/footer/footer.component';
import styleDefault from './footer.style.css';

class Footer extends FooterBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-footer', Footer);
