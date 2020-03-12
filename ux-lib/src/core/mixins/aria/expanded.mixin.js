import SlotChange from '../dom/slotchange.mixin';
import debounce from 'lodash.debounce';

export default function AriaExpandedMixin(base) {
  /**
   * Cette mixin permet de gérer la propriété "aria-expanded".
   *
   * @mixin
   *
   * @prop {Boolean} expanded - ouvre l'élément
   *
   * @export
   * @class AriaExpandedMixin
   * @extends {SlotChange}
   */
  class AriaExpandedMixin extends SlotChange(base) {
    static get properties() {
      return {
        expanded: { type: 'boolean' }
      };
    }
    constructor() {
      super();
      if (!this.trigger) this.trigger = this.$.querySelector('.js-trigger');
      if (!this.content) this.content = this.$.querySelector('.js-content');

      this.handleClick = this.handleClick.bind(this);
      this._setHeight = debounce(this._setHeight, 150).bind(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;

      if (name === 'expanded') {
        if (this.expanded) {
          this.trigger.setAttribute('aria-expanded', 'true');
          this.content.setAttribute('aria-hidden', 'false');
        } else {
          this.trigger.setAttribute('aria-expanded', 'false');
          this.content.setAttribute('aria-hidden', 'true');
        }
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      this._setHeight();

      window.addEventListener('resize', this._setHeight);

      this._slots.forEach(slot => {
        this.slotChange(slot, this._setHeight);
      });
      this.trigger.addEventListener('click', this.handleClick);
    }

    handleClick() {
      this.expanded = !this.expanded;
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) super.disconnectedCallback();
      window.removeEventListener('resize', this._setHeight);
      this.trigger.removeEventListener('click', this.handleClick);
    }

    _setHeight() {
      let heightOfContent = this.content.scrollHeight;
      this.style.setProperty('--containerHeight', `${heightOfContent}px`);
    }
  }
  return AriaExpandedMixin;
}
