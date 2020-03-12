import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';

/**
 * Ce composant sert à utiliser les balises ui-sref dans angularjs.
 * Il est en hidden et en display none.
 * Quand son attribut href change il emet un evenement uxhref
 * et il regarde si son élément parent a l'attribut sref si
 * initialise l'attibut link du parent avec la valeur de href.
 *
 * @export
 * @class SRef
 * @extends {BaseShadowComponent}
 *
 * @prop {String} href - valeur initailisé par angularjs
 */

export default class SRefBase extends BaseShadowComponent {
  static get properties() {
    return {
      href: { type: 'string' }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'href')
      if (this.parentElement && this.parentElement.hasAttribute('sref')) {
        this.parentElement.libLink = this.href;
      } else {
        this.dispatchEvent(
          new CustomEvent('liblink', {
            detail: {
              href: this.href
            },
            bubbles: true
          })
        );
      }
  }

  connectedCallback() {
    this.hidden = true;
    this.style.display = 'none';
  }
}
