export default function AriaExpandedMixin(base) {
  /**
   * @property {HTMLElement} tag - créé l'élément souhaité
   * @slot - unnamed / default slot
   */

  let expandedItemCounter = 0;

  class AriaExpandedMixin extends base {
    static get properties() {
      return {
        expanded: {
          type: 'boolean'
        }
      };
    }

    constructor() {
      super();
      this._toggleExpanded = this._toggleExpanded.bind(this);
      if (!this.button) this.button = this.$.querySelector('.js-button');
      if (!this.content) this.content = this.$.querySelector('.js-content');
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (name === 'expanded') {
        if (this.expanded) {
          this.button.setAttribute('aria-expanded', 'true');
          this.content.style.display = 'block';
        } else {
          this.button.setAttribute('aria-expanded', 'false');
          this.content.style.display = 'none';
        }
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();

      const id = expandedItemCounter++;
      const tagName = this.tagName.toLowerCase();

      this.content.setAttribute('id', `${tagName}-${id}`);
      this.button.setAttribute('aria-controls', `${tagName}-${id}`);
      this.button.addEventListener('click', this._toggleExpanded);
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) super.disconnectedCallback();

      this.button.removeEventListener('click', this._toggleExpanded);
    }

    _toggleExpanded() {
      if (!this.expanded) {
        this.setAttribute('expanded', '');
      } else {
        this.removeAttribute('expanded');
      }
    }
  }
  return AriaExpandedMixin;
}
