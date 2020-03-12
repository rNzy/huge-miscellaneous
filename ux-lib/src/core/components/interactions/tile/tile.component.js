import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-tile js-container"><slot></slot></div>';

/**
 * Permet de créer une tuile, et de lui ajouter une couleur ou une image d'arrière-plan.
 *
 * @element ux-tile
 *
 * @prop {Boolean} shadow - ajoute une ombre à la tuile
 * @prop {String} libBgColor - modifie la couleur de fond de la tuile
 * @prop {String} bgImg - cible de l'image à afficher en arrière-plan
 *
 * @slot default
 *
 * @export
 * @class TileBase
 * @extends {BaseShadowComponent, StackMixin}
 */
export default class TileBase extends Base {
  static get properties() {
    return {
      shadow: { type: 'boolean' },
      libBgColor: { type: 'string' },
      bgImg: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._tile = this.$.querySelector('.c-tile');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'shadow':
        this._shadow();
        break;
      case 'lib-bg-color':
        this._setBgColor();
        break;
      case 'bg-img':
        this._setBgImg();
        break;
    }
  }

  _setBgColor() {
    switch (this.libBgColor) {
      case 'primary':
      case 'secondary':
      case 'tertiary':
        this._tile.classList.add(`c-tile--${this.libBgColor}`);
        break;
    }
  }

  _setBgImg() {
    if (this.bgImg) {
      this._addSrc();

      this._tile.innerHTML =
        this._tile.innerHTML +
        `<img class="c-tile--img" src="${this.imgsrc}" alt=""></img>`;

      this._tile.classList.add('c-tile--img');
    } else {
      this._tile.classList.remove('c-tile--img');
    }
  }

  _addSrc() {
    const imgPath = `${this.uxLibUrl}/assets/images/`;

    let finalSrc = this.bgImg;

    if (
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
    this.imgsrc = finalSrc;
  }

  _shadow() {
    this.shadow
      ? this._tile.classList.add('c-tile--shadow')
      : this._tile.classList.remove('c-tile--shadow');
  }
}
