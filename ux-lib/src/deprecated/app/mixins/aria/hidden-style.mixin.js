import styleDefault from './hidden-style.style.css';

export default function AriaHiddenStyleMixin(base) {
  /**
   * @property {HTMLElement} tag - créé l'élément souhaité
   * @slot - unnamed / default slot
   */

  class AriaHiddenStyleMixin extends base {
    static get style() {
      return styleDefault.toString();
    }
  }

  return AriaHiddenStyleMixin;
}
