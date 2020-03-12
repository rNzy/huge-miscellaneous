import GridBase from '../../structures/grid/grid.component';

const Base = GridBase;

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-radio-grid">
  <div class="js-container c-grid"></div>
</div>`;

/**
 * Composant affichant un bouton radio sous forme de grid.
 *
 * @element ux-radio-grid
 *
 * @prop {String} value - "value" de l'élément html bouton radio
 * @prop {Boolean} checked - indique si le bouton radio est sélectionné
 *
 * @export
 * @class RadioGridBase
 * @extends {GridBase}
 */
export default class RadioGridBase extends Base {
  static get properties() {
    return {
      value: { type: 'string' },
      checked: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.radioBtn = this.$.querySelector('.c-radio-grid');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'checked')
      this.setBooleanClass(this.checked, 'c-radio-grid--checked');
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.hasAttribute('role')) this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', -1);
  }
}
