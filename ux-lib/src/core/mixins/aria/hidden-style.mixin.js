import styleDefault from './hidden-style.style.css';

/**
 *Cette mixin ne fait qu'importer une classe css .a11y-hidden
 * que l'on peut utiliser pour cacher visuellement l'element
 *
 * @export
 * @param {*} base
 * @returns
 */
export default function AriaHiddenStyleMixin(base) {
  class AriaHiddenStyleMixin extends base {
    static get style() {
      return styleDefault.toString();
    }
  }

  return AriaHiddenStyleMixin;
}
