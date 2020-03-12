import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

/**
 * @attr {String} tag - défini le tag du template html
 * @slot - défaut
 */
export default class SectionBase extends Base {
  static get properties() {
    return {
      tag: { type: 'string' }
    };
  }

  constructor() {
    super();
  }

  template() {
    const tag = this.tag || 'div';
    const tpl = document.createElement('template');
    tpl.innerHTML = `<${tag} class="js-container"><slot></slot></${tag}>`;
    return tpl;
  }
}
