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

export default class TabsOnePanelPanelBase extends Base {
  template() {
    return tpl;
  }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel');
    this.setAttribute('slot', 'panel');
    this.tabIndex = 0;
  }
}
