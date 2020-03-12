import ContainerBase from './../../../../core/components/structures/container/container.component';

import styleDefault from './container.style.css';

/**
 * This is a simple container
 */
class Container extends ContainerBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-container', Container);
