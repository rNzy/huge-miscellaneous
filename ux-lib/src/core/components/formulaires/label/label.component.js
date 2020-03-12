import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';

let uxLabelCounter = 0;

const Base = SlotChange(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = '<label class="c-label js-container"><slot></slot></label>';

/**
 * Composant affichant un label.
 * Ce label peut "contenir" l'ux-input au sein de son slot.
 * Pour cibler correctement l'ux-input on peut rajouter
 * à celui-ci l'attribut ux-label-target.
 *
 * @element ux-label
 *
 * @prop {String} for - propriété qui va remplir le "for" du label et l'id de l'input
 * @prop {"valid"|"error"} [state] - état, valide ou erreur
 * @prop {Boolean} [disabled] - ajoute un style "désactivé" au label
 *
 * @slot default
 *
 * @export
 * @class LabelBase
 * @extends {BaseShadowComponent, SlotChange}
 */
export default class LabelBase extends Base {
  static get properties() {
    return {
      for: { type: 'string' },
      disabled: { type: 'boolean' },
      state: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._updateLabel = this._updateLabel.bind(this);
    this._onClick = this._onClick.bind(this);

    this.slotChange(this._slots[0], this._updateLabel);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    this.addEventListener('click', this._onClick);
    this._updateLabel();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();

    this.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'for':
        this.setBooleanClass(this.for, 'c-label--clickable');
        break;
      case 'disabled':
        this.setBooleanClass(this.disabled, 'c-label--disabled');
        break;
      case 'state':
        // Remove old class
        this.container.className = this.container.className.replace(
          /c-label-state--\w*/g,
          ''
        );
        this.container.classList.add('c-label-state--' + this.state);
        break;
    }
  }

  _updateLabel() {
    Promise.resolve().then(() => {
      if (!this.id) {
        this.id = `ux-label-generated-${uxLabelCounter++}`;
      }
      const oldTarget = this._currentLabelTarget();
      const newTarget = this._findTarget();
      if (!newTarget || oldTarget === newTarget) {
        return;
      }
      if (oldTarget) {
        oldTarget.removeAttribute('aria-labelledby');
      }
      newTarget.setAttribute('aria-labelledby', this.id);
    });
  }

  _currentLabelTarget() {
    return document.querySelector(`[aria-labelledby="${this.id}"]`);
  }

  _findTarget() {
    if (this.for) {
      return document.getElementById(this.for);
    }

    // Trouve tout les nodes enfants du slot
    // et supprime juste les nodes de types text.
    const slottedChildren = this._slot[0]
      .assignedNodes({ flatten: true })
      .filter(child => child.nodeType !== Node.TEXT_NODE);

    const el = slottedChildren.find(child =>
      child.hasAttribute('ux-label-target')
    );

    return el || slottedChildren[0];
  }

  _onClick(event) {
    const el = this._currentLabelTarget();

    if (!el || event.target === el) return;
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', 0);

    el.focus();
    el.click();
  }
}
