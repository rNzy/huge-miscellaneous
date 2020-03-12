import ContainerBase from './../../../../core/components/structures/container/container.component';

import styleDefault from './container.style.css';

/**
 * Permet de créer un conteneur et de lui appliquer différents styles.
 */
class Container extends ContainerBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-container', Container);
