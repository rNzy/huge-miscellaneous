import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(SlotChange(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="js-container c-radio-group"><slot></slot></div>';

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38,
  HOME: 36,
  END: 35
};

const RADIO_ITEMS = ['ux-radio-button', 'ux-radio-grid'];

/**
 * Composant permettant de grouper des boutons radio.
 *
 * @element ux-radio-group
 *
 * @prop {String} value - "value" des l'éléments html boutons radio
 *
 * @slot - default
 *
 * @export
 * @class RadioGroupBase
 * @extends {BaseShadowComponent, SlotChange, StackMixin}
 */
export default class RadioGroupBase extends Base {
  static get properties() {
    return {
      value: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this._listenRadio = this._listenRadio.bind(this);
    this.eventHistory = {};
    this.formItSelf;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'value') {
      if (this.formItSelf) {
        this.formItSelf = false;
      } else {
        this._presetItem();
      }
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'radiogroup');

    this._presetItem();

    const firstCheckedButton = this.checkedRadioButton;

    if (firstCheckedButton) {
      this._uncheckAll();
      this._checkNode(firstCheckedButton);
      this._setValue();
    } else {
      const firstButtonOnLoad = this.querySelector(RADIO_ITEMS);
      if (firstButtonOnLoad) firstButtonOnLoad.setAttribute('tabindex', 0);
    }

    this.addEventListener('keydown', this._onKeyDown);
    this._listenRadio();

    this.slotChange(this._slots[0], this._listenRadio);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
  }

  _onKeyDown(e) {
    switch (e.keyCode) {
      case KEYCODE.UP:
      case KEYCODE.LEFT:
        e.preventDefault();
        this._setCheckedToPrevButton();
        break;

      case KEYCODE.DOWN:
      case KEYCODE.RIGHT:
        e.preventDefault();
        this._setCheckedToNextButton();
        break;

      case KEYCODE.HOME:
        e.preventDefault();
        this._setChecked(this.firstRadioButton);
        break;

      case KEYCODE.END:
        e.preventDefault();
        this._setChecked(this.lastRadioButton);
        break;

      case KEYCODE.SPACE:
        e.preventDefault();
        if (e.target.tagName.toLowerCase() === RADIO_ITEMS)
          this._setChecked(e.target);
        break;

      default:
        break;
    }
  }

  get checkedRadioButton() {
    return (
      this.querySelector('[aria-checked="true"]') ||
      this.querySelector('[checked]')
    );
  }

  get firstRadioButton() {
    return this.querySelector('[role="radio"]:first-of-type');
  }

  get lastRadioButton() {
    return this.querySelector('[role="radio"]:last-of-type');
  }

  _prevRadioButton(node) {
    let prev = node.previousElementSibling;
    while (prev) {
      if (prev.getAttribute('role') === 'radio') {
        return prev;
      }
      prev = prev.previousElementSibling;
    }
    return null;
  }

  _nextRadioButton(node) {
    let next = node.nextElementSibling;
    while (next) {
      if (next.getAttribute('role') === 'radio') {
        return next;
      }
      next = next.nextElementSibling;
    }
    return null;
  }

  _setCheckedToPrevButton() {
    let checkedButton = this.checkedRadioButton || this.lastRadioButton;
    if (checkedButton === this.firstRadioButton) {
      this._setChecked(this.lastRadioButton);
    } else {
      this._setChecked(this._prevRadioButton(checkedButton));
    }
  }

  _setCheckedToNextButton() {
    let checkedButton = this.checkedRadioButton || this.firstRadioButton;
    if (checkedButton === this.lastRadioButton) {
      this._setChecked(this.firstRadioButton);
    } else {
      this._setChecked(this._nextRadioButton(checkedButton));
    }
  }

  _setChecked(node) {
    this.formItSelf = true;
    this._uncheckAll();
    this._checkNode(node);
    this._focusNode(node);
    this._setValue();

    // déclenche un event 'change' pour remonter la valeur sélectionnée
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.value
        },
        bubbles: true
      })
    );
  }

  _uncheckAll() {
    const radioButtons = this.querySelectorAll('[role="radio"]');
    for (let i = 0; i < radioButtons.length; i++) {
      let btn = radioButtons[i];
      btn.setAttribute('aria-checked', 'false');
      if (btn.hasAttribute('checked')) btn.removeAttribute('checked');
      btn.tabIndex = -1;
    }
  }

  _checkNode(node) {
    node.setAttribute('aria-checked', 'true');
    node.setAttribute('checked', '');
    node.tabIndex = 0;
  }

  _focusNode(node) {
    node.focus();
  }

  _setValue() {
    this.value = this.checkedRadioButton.value;
  }

  _listenRadio() {
    const radioButtons = [...this.querySelectorAll(RADIO_ITEMS)];

    this._presetItem();

    radioButtons.forEach(el => {
      // Supprime les anciens ev de click
      if (this.eventHistory[el]) {
        el.removeEventListener('click', this.eventHistory[el]);
      }

      // Stock dans un tableau les ev de click pour pouvoir
      // les remove ultérieurement.
      this.eventHistory[el] = () => this._setChecked(el);

      el.addEventListener('click', this.eventHistory[el]);
    });
  }

  _presetItem() {
    const radioButtons = [...this.querySelectorAll(RADIO_ITEMS)];

    radioButtons.forEach(el => {
      if (
        (this.value != null && this.value != '' && el.value === this.value) ||
        el.checked
      ) {
        this._setChecked(el);
        return;
      }
    });
  }
}
