import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38,
  HOME: 36,
  END: 35
};

export default class RadioGroup extends Base {
  static get properties() {
    return {
      value: { type: 'string' }
    };
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'radiogroup');

    let firstCheckedButton = this.checkedRadioButton;
    if (firstCheckedButton) {
      this._uncheckAll();
      this._checkNode(firstCheckedButton);
      this._setValue();
    } else {
      this.querySelector('[role="radio"]').setAttribute('tabindex', 0);
    }

    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
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
        if (e.target.tagName.toLowerCase() === 'howto-radio-button')
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
    let checkedButton = this.checkedRadioButton || this.firstRadioButton;
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
      if (btn.hasAttribute('checked')) btn.checked = false;
      btn.tabIndex = -1;
    }
  }

  _checkNode(node) {
    node.setAttribute('aria-checked', 'true');
    node.tabIndex = 0;
  }

  _focusNode(node) {
    node.focus();
  }

  _setValue() {
    this.value = this.checkedRadioButton.value;
  }

  _onClick(e) {
    if (e.target.getAttribute('role') === 'radio') {
      this._setChecked(e.target);
    }
  }
}
