import styleDefault from './btnNoStyle.style.css';

/**
 * Pour utiliser cette mixin il suffit de l'importer
 * et de mettre la classe m-btn-no-style sur
 * le bouton que l'on veux.
 * @param {*} base
 */
export default function BtnNoStyleMixin(base) {
  class BtnNoStyleMixin extends base {
    static get style() {
      return styleDefault.toString();
    }
  }
  return BtnNoStyleMixin;
}
