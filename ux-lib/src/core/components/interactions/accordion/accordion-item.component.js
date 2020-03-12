import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import AriaExpandedMixin from '../../../mixins/aria/expanded.mixin';
import BtnNoStyleMixin from '../../../mixins/styles/btnNoStyle.mixin';

const Base = BtnNoStyleMixin(AriaExpandedMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-accordion js-container">
  <div role="heading">
    <button class="c-accordion__trigger js-trigger m-btn-no-style">
      <slot name="accordion-header"></slot>
      <ux-svg icon="arrow-down" lib-size="sm" class="c-accordion__icon" aria-hidden="true"></ux-svg>
    </button>
  </div>
  <div class="c-accordion__content js-content" aria-hidden="true">
    <slot></slot>
  </div>
</div>
`;

// Compte le nombre d'instances de `<ux-accordion-item>`. On utilise le nombre pour créer des IDs uniques.
let uxAccordionItemCounter = 0;

/**
 * Composant affichant un accordéon qui s'ouvre ou se ferme pour dévoiler/masquer du contenu.
 *
 * @element ux-accordion-item
 *
 * @prop {Number} [a11yLevel=3] - aria-level
 *
 * @slot accordion-header
 * @slot default
 *
 * @export
 * @class AccordionItemBase
 * @extends {BaseShadowComponent, AriaExpandedMixin, BtnNoStyleMixin}
 */
export default class AccordionItemBase extends Base {
  static get properties() {
    return {
      a11yLevel: { type: 'number' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.iconEl = this.$.querySelector('.c-accordion__icon');
    this.headingEl = this.$.querySelector('[role="heading"]');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (oldValue === newValue) return;

    if (name === 'expanded') {
      if (this.iconEl) {
        this.expanded
          ? this.iconEl.classList.add('c-accordion__icon--rotate')
          : this.iconEl.classList.remove('c-accordion__icon--rotate');
      }
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    const INSTANCE_ID = uxAccordionItemCounter++;
    // Button
    this.trigger.id = `ID-BTN-ITEM-${INSTANCE_ID}`;
    this.trigger.setAttribute('aria-controls', `ID-ACC-ITEM-${INSTANCE_ID}`);

    // Content
    this.content.id = `ID-ACC-ITEM-${INSTANCE_ID}`;
    this.content.setAttribute('aria-labelledby', `ID-BTN-ITEM-${INSTANCE_ID}`);

    this._setHeadingAriaLevel();
  }

  /**
   * pour des raisons d'accessibilité le bouton d'activation de l'accordéon
   * doit être inclus dans un élément avec le role heading. On doit lui définir
   * un aria-level, par défaut suivant la structure de nos pages un niveau 3 est
   * appliqué.
   */
  _setHeadingAriaLevel() {
    this.headingEl.setAttribute(
      'aria-level',
      this.a11yLevel ? this.a11yLevel : '3'
    );
  }
}
