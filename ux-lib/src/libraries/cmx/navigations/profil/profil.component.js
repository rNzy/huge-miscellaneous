import ProfilBase from '../../../../core/components/navigations/profil/profil.component';
import IsActiveMixin from '../../../../core/mixins/styles/isActive.mixin';

const Base = IsActiveMixin(ProfilBase);

import styleDefault from './profil.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-profil js-container">
  <ux-img class="c-profil__img" src="profil.png"></ux-img>
  <div class="c-profil__content">
    <div class="c-profil__name"></div>
    <div class="c-profil__connexion"></div>
  </div>
</div>`;
class Profil extends Base {
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'lib-link') {
      const nameEl = this.$.querySelector('.c-profil__name');
      if (this.libLink) {
        const iconEl = document.createElement('ux-svg');
        iconEl.setAttribute('icon', 'pen-wo-circle');
        iconEl.libSize = 'xs';
        iconEl.classList.add('c-profil__link-icon');
        nameEl.appendChild(iconEl);
      } else {
        const iconEl = this.$.querySelector('ux-svg');
        if (iconEl) nameEl.removeChild(iconEl);
      }
    }
  }
}

customElements.define('ux-profil', Profil);
