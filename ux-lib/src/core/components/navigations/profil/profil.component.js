import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-profil">
  <div class="c-profil__content">
    <div class="c-profil__name"></div>
    <div class="c-profil__connexion"></div>
  </div>
</div>`;

/**
 * @export
 * @class ProfilBase
 * @extends {BaseShadowComponent}
 *
 */
export default class ProfilBase extends BaseShadowComponent {
  static get properties() {
    return {
      name: { type: 'string' },
      connexion: { type: 'string' },
      libLink: { type: 'string' }
    };
  }
  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    switch (name) {
      case 'name':
        const nameEl = this.$.querySelector('.c-profil__name');
        nameEl.textContent = this.name;
        break;
      case 'connexion':
        const connexionEl = this.$.querySelector('.c-profil__connexion');
        connexionEl.textContent = this.connexion;
        break;
      case 'lib-link':
        const child = this.$.querySelector('.c-profil');

        const parent = child.parentNode;
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', this.libLink);
        linkEl.classList.add('c-profil__link');
        parent.replaceChild(linkEl, child);
        linkEl.appendChild(child);
        break;
    }
  }
}
