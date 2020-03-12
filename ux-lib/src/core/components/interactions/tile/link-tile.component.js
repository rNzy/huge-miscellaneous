import TileBase from './tile.component';
import './arrow.svg';

const Base = TileBase;

const tpl = document.createElement('template');
tpl.innerHTML =
  '<a class="c-link-tile js-container"><div class="c-tile"><slot></slot><span class="c-link-tile--arrow"><ux-svg shadow icon="arrow" lib-size="md"></ux-svg></span></div></a>';

/**
 * Permet de créer une tuile cliquable et de lui appliquer une couleur ou une image d'arrière-plan.
 *
 * @element ux-link-tile
 *
 * @prop {String} libLink - la cible href du lien
 * @prop {String} a11yLabel - texte de vocalisation du lien
 *
 * @slot default
 *
 * @export
 * @class LinkTileBase
 * @extends {TileBase}
 */

export default class LinkTileBase extends Base {
  static get properties() {
    return {
      libLink: {
        type: 'string'
      },
      a11yLabel: {
        type: 'string'
      }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._linkTile = this.$.querySelector('.c-link-tile');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'lib-link':
        this.libLink
          ? this._linkTile.setAttribute('href', this.libLink)
          : this._linkTile.removeAttribute('href');
        break;
      case 'a11y-label':
        this.a11yLabel
          ? this.container.setAttribute('aria-label', this.a11yLabel)
          : this.container.removeAttribute('aria-label');
        break;
    }
  }
}
