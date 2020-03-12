import EspaceBase from '../../../../core/components/navigations/espace/espace.component';
import IsActiveMixin from '../../../../core/mixins/styles/isActive.mixin';

const Base = IsActiveMixin(EspaceBase);

import styleDefault from './espace.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<a class="c-espace js-container" href="#">
<span class="c-espace__label"></span>
<ux-svg icon="switcher" lib-size="sm"></ux-svg>
</a>`;

class Espace extends Base {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) {
      this.setAttribute('slot', 'left');
    }
  }
}

customElements.define('ux-espace', Espace);
