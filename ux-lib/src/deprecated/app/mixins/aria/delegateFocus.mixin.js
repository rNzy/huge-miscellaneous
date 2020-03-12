export default function AriaDelegateFocus(base) {
  // To use this mixin you need to ensure that the component
  // extending it has a class in its template with the name
  // .js-delegate-focus on an element that can receive focus
  // (<a>, <button>, etc...) or set the appropriate tabindex
  // attribute and value

  class AriaDelegateFocus extends base {
    constructor() {
      super();
      this.delegateFocusElement = this.$.querySelector('.js-delegate-focus');
      this._delegateFocus = this._delegateFocus.bind(this);
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();

      this.addEventListener('focus', this._delegateFocus);
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) super.disconnectedCallback();
      this.removeEventListener('focus', this._delegateFocus);
    }

    _delegateFocus() {
      this.delegateFocusElement.focus();
    }
  }
  return AriaDelegateFocus;
}
