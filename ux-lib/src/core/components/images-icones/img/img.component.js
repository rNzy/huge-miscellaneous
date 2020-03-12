import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin.js';
import ElementAlignmentMixin from '../../../../core/mixins/layout/elementAlignment.mixin.js';

import styleDefault from './img.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<img class="js-container c-img" alt=""/>';

/**
 * Composant qui affiche une image. Les fichiers images sont à enregistrer dans le dossier assets/images de la librairie.
 *
 * @element ux-img
 *
 * @prop {String} src - le chemin d'accès ou l'url du fichier image à afficher
 * @prop {String} alt - texte alternatif
 * @prop {Number} [height] - hauteur
 * @prop {Number} [width] - largeur
 * @prop {Boolean} [ariaHidden] - ajoute la propriété aria-hidden="true" à la balise <img>
 *
 * @export
 * @class ImgBase
 * @extends {BaseShadowComponent, ElementAlignmentMixin}
 */
export default class ImgBase extends ElementAlignmentMixin(
  BaseShadowComponent
) {
  static get properties() {
    return {
      src: {
        type: 'string'
      },
      alt: {
        type: 'string'
      },
      height: {
        type: 'number'
      },
      width: {
        type: 'number'
      },
      ariaHidden: {
        type: 'boolean'
      }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    switch (name) {
      case 'src':
        this._setSrc();
        break;
      case 'alt':
        this.container.alt = this.alt;
        break;
      case 'height':
        this.container.height = this.height;
        break;
      case 'width':
        this.container.width = this.width;
        break;
      case 'aria-hidden':
        this.container.setAttribute('aria-hidden', this.ariaHidden);
    }
  }

  _setSrc() {
    const imgPath = `${this.uxLibUrl}/assets/images/`;

    let finalSrc = this.src;

    if (finalSrc.startsWith('./assets/images/')) {
      finalSrc = finalSrc.substr(2);
      finalSrc = `${this.uxLibUrl}/${finalSrc}`;
    } else if (
      !(
        finalSrc.startsWith('http') ||
        finalSrc.startsWith('https') ||
        finalSrc.startsWith('//')
      )
    ) {
      // Remove first /
      finalSrc = finalSrc.startsWith('/') ? finalSrc.substr(1) : finalSrc;
      // Remove ./
      finalSrc = finalSrc.startsWith('./') ? finalSrc.substr(2) : finalSrc;
      // add base
      finalSrc = imgPath + finalSrc;
    }
    this.container.src = finalSrc;
  }
}
