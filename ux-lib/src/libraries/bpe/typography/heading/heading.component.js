import { HeadingBase } from './../../../../core/components/typography/heading/heading.component';
import styleDefault from './heading.style.css';

/**
 * This is a simple text
 */
class Heading extends HeadingBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-heading', Heading);
