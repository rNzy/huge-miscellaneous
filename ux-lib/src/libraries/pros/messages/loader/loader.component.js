import LoaderBase from '../../../../core/components/messages/loader/loader.component';
import styleDefault from './loader.style.css';

/**
 * Display an alert message
 */
class Loader extends LoaderBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-loader', Loader);
