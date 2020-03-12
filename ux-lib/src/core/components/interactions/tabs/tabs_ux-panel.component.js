import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="js-container">
  <slot></slot>
</div>
`;

// Compte le nombre d'instances de `<ux-tabs-panel>`.
let counter = 0;

/**
 *
 */
export default class TabsPanelBase extends BaseShadowComponent {
  constructor() {
    super();
  }

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
