import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

let buxLabelCounter = 0;

const tpl = document.createElement('template');
tpl.innerHTML = `<label><slot></slot></label>`;

export default class Label extends BaseShadowComponent {
  static get properties() {
    return {
      for: {
        type: 'string'
      }
    };
  }

  constructor() {
    super();
    this._slot = this.$.querySelector('slot');
    this._slot.addEventListener('slotchange', this._onSlotChange.bind(this));
    this.addEventListener('click', this._onClick);
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    this._updateLabel();
  }

  _updateLabel() {
    // Under polyfill you may end up in situations where elements referenced
    // by the label are parsed _after_ the label is connected, so defer
    // looking for them until the next microtask.
    Promise.resolve().then(() => {
      // Greedily generate id if one is not already present.
      if (!this.id) {
        this.id = `bux2-label-generated-${buxLabelCounter++}`;
      }
      let oldTarget = this._currentLabelTarget();
      let newTarget = this._findTarget();
      if (!newTarget || oldTarget === newTarget) {
        return;
      }
      if (oldTarget) {
        oldTarget.removeAttribute('aria-labelledby');
      }
      newTarget.setAttribute('aria-labelledby', this.id);
    });
  }

  _onSlotChange() {
    this._updateLabel();
  }

  _onClick(event) {
    let el = this._currentLabelTarget();
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    // If nothing is labeled, or if a wrapped child was clicked on, return.
    if (!el || event.target === el) {
      return;
    }
    el.focus();
    el.click();
  }

  _currentLabelTarget() {
    // Query inside of the current scope. This could either be a shadow root
    // or the main document.
    let scope = this.getRootNode();
    return scope.querySelector(`[aria-labelledby="${this.id}"]`);
  }

  /**
   * If there is a for property, return the element with that id.
   * Else, return the explicitly labeled child.
   * Else, return the first element child (assume it's implicitly labeled).
   */
  _findTarget() {
    if (this.for) {
      // external target
      let scope = this.getRootNode();
      return scope.getElementById(this.for);
    }

    // Get all non-text slotted children
    let slottedChildren = this._slot
      .assignedNodes({ flatten: true })
      .filter(child => child.nodeType !== Node.TEXT_NODE);
    // Find the first one that defines an explicit external target
    let el = slottedChildren.find(child =>
      child.hasAttribute('bux-label-target')
    );
    // Return that first explicit external target, or
    // the first child if there is none.
    return el || slottedChildren[0];
  }
}

customElements.define('bux2-label', Label);
