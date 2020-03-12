import InputBase from './input.component.js';

/**
 * Composant affichant un champ de type date.
 *
 * @element ux-input-date
 *
 * @export
 * @class InputDateBase
 * @extends {InputBase}
 */
export default class InputDateBase extends InputBase {
  constructor() {
    super();
    this.input.setAttribute('type', 'date');
    this.input.classList.add('c-input-date');
  }
}
