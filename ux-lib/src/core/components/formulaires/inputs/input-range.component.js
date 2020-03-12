import InputBase from './input.component.js';

// NB: tout les wrapper c-input-range__input_wrap et c-input-range__value_wrap
// sont nécessaire pour avoir le même espacement entre Firefox et chrome
// entre l'input et les span
const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-input-range">
  <div class="c-input-range__wrap">
    <div class="c-input-range__wrap2">
      <span type="range" class="c-input-range__lower" aria-hidden="true"></span>
      <input type="range" class="c-input c-input-range__input js-delegate-focus">
    </div>
    <span type="range" class="c-input-range__val" aria-hidden="true"></span>
  </div>
  <div class="c-input-range__legend" aria-hidden="true">
      <span class="c-input-range__min"><slot name="left"></slot></span>
      <span class="c-input-range__middle"><slot name="middle"></slot></span>
      <span class="c-input-range__max"><slot name="right"></slot></span>
  </div>
</div>`;

/**
 * Composant affichant un champ de type range.
 *
 * @element ux-input-range
 *
 * @prop {String} middlePosition - donne la position médiane du label (ex: 13px ou 5%)
 * @prop {String} unit - l'unité du range est utile pour donner la valeur actuelle du range
 *
 * @slot left
 * @slot middle
 * @slot right
 *
 * @export
 * @class InputRangeBase
 * @extends {InputBase}
 */
export default class InputRangeBase extends InputBase {
  static get properties() {
    return {
      middlePosition: { type: 'string' },
      unit: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this.rangeLowerEl = this.$.querySelector('.c-input-range__lower');
    this.rangeValEl = this.$.querySelector('.c-input-range__val');

    this.keyEvent = this.keyEvent.bind(this);
    this.valueListener = this.valueListener.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'middle-position') {
      this.$.querySelector(
        '.c-input-range__middle'
      ).style.left = this.middlePosition;
    }
  }

  setValue(val) {
    let numVal = Number(val);

    this.formItSelf = true;

    // Fais attention au min, max
    if (this.min && numVal < this.min) numVal = this.min;
    if (this.max && numVal > this.max) numVal = this.max;

    // Met la valeur à l'input
    this.input.value = numVal;
    this.value = numVal;

    this.valueListener();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.input.addEventListener('keydown', this.keyEvent);
    this.input.addEventListener('input', this.valueListener);

    this.valueListener();

    if (!this.value) {
      this.value = this.min ? this.min : 0;
    }
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.input.removeEventListener('keydown', this.keyEvent);
    this.input.removeEventListener('focus', this.valueListener);
  }

  /**
   * Permet de bien placer la valeur actuelle de l'input
   * et de mettre la barre sur les valeurs avant le curseur
   */
  valueListener() {
    const min = this.min || 0;
    const max = this.max || 100;

    const val = ((this.input.value - min) / (max - min)) * 100;

    // Met en rouge ce qui a été selectionné
    this.rangeLowerEl.style.width = val + '%';

    // Met la valeur en dessous du curseur
    this.rangeValEl.innerText = this.unit
      ? `${this.value} ${this.unit}`
      : this.value;

    // Position la valeur en dessous du curseur
    const w = this.rangeValEl.offsetWidth;
    const new2 = (val * w) / 100;
    this.rangeValEl.style.left = `calc( ${val}% - ${new2}px )`;
  }

  keyEvent(e) {
    let newVal = 0;

    switch (e.which) {
      case 37: // left
      case 109: // minus on numpad
      case 54: // minus on number
        newVal = Number(this.value) - Number(this.step);
        if (newVal >= this.valueMin) this.value = newVal;
        break;
      case 39: // right
      case 107: // plus on numpad
      case 187: // plus on number
        newVal = Number(this.value) + Number(this.step);
        if (newVal <= this.valueMax) this.value = newVal;
        break;
    }
  }
}
