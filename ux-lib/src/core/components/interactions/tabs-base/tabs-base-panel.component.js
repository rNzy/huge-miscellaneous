import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import AriaHiddenStyleMixin from '../../../../core/mixins/aria/hidden-style.mixin';

const Base = AriaHiddenStyleMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="js-container">
  <p class="a11y-hidden">Début du contenu de l'onglet</p> 
    <slot></slot>
  <p class="a11y-hidden">Fin du contenu de l'onglet</p> 
</div>
`;

// Compte le nombre d'instances de `<ux-tabs-panel>`.
let counter = 0;

/**
 * Composant intégré à ux-tabs permettant de gérer les panneaux de contenu.
 *
 * @element ux-tabs-panel
 *
 * @slot default
 *
 * @export
 * @class TabsPanelBase
 * @extends {BaseShadowComponent, AriaHiddenStyleMixin}
 */
export default class TabsPanelBase extends Base {
  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.id) this.id = `ux-tabs-panel-${counter++}`;
    this.setAttribute('role', 'tabpanel');
    this.tabIndex = 0;
  }
}
