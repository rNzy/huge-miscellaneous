import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import styleDefault from './row-cell.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="js-container c-row-cell"><slot></slot></div>`;

/**
 * Crée une cellule pouvant s'aligner avec flex. A utiliser dans ux-row.
 *
 * @element ux-row-cell
 *
 * @prop {"start"|"end"|"center"|"between"|"around"|"evenly"} alignX - définit comment la cellule est alignée en flexbox
 *
 * @slot - default
 *
 * @export
 * @class RowCellBase
 * @extends {BaseShadowComponent}
 */
export default class RowCellBase extends BaseShadowComponent {
  static get properties() {
    return {
      alignX: {
        type: 'string'
      }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) {
      return;
    } else {
      this.container.classList.remove(`c-row-cell--${oldValue}`);
      this.container.classList.add(`c-row-cell--${newValue}`);
    }
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}
