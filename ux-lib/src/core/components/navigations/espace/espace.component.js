import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
// MESURE CONSERVATOIRE
// import styleDefault from './espace.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<a class="c-espace js-container" href="#"></a>`;
/**
 *
 *
 * @export
 * @class EspaceBase
 * @extends {BaseShadowComponent}
 *
 */
export default class EspaceBase extends BaseShadowComponent {
  static get properties() {
    return {
      label: { type: 'string' },
      libLink: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  // MESURE CONSERVATOIRE
  // static get style() {
  //   return styleDefault.toString();
  // }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'lib-link') {
      if (this.libLink) this.container.setAttribute('href', this.libLink);
    }
    if (name === 'label') {
      const labelEl = this.$.querySelector('.c-espace__label');
      if (this.label) labelEl.textContent = this.label;
    }
  }
}
