import Img from '../../../../core/components/images-icones/img/img.component';
import styleDefault from './logo.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-logo">
  <img class="js-container c-img" alt=""/>
</div>
`;
/**
 * @export
 * @class LogoBase
 * @extends {Img}
 */

export default class LogoBase extends Img {
  static get properties() {
    return {
      center: {
        type: 'boolean'
      },
      libLink: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'center')
      this.setBooleanClass(this.center, 'c-logo-center-center', this);

    if (name === 'lib-link') {
      const child = this.$.querySelector('.c-logo');

      const parent = child.parentNode;
      const linkEl = document.createElement('a');
      linkEl.setAttribute('href', this.libLink);
      linkEl.classList.add('c-logo__link');
      linkEl.title = 'Accueil';
      linkEl.setAttribute('aria-label', "Aller à l'accueil");
      parent.replaceChild(linkEl, child);
      linkEl.appendChild(child);
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) this.setAttribute('slot', 'header-logo');
  }
}
