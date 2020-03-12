import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';
import listMixin from '../../../mixins/aria/list.mixin';

const Base = listMixin(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = '<ul class="c-list js-container"><slot></slot></ul>';

/**
 * Composant créant une liste d'éléments.
 *
 * @element ux-list
 *
 * @prop {Boolean} [bullet] - ajoute des puces aux éléments de la liste
 *
 * @slot default
 *
 * @export
 * @class ListBase
 * @extends {BaseShadowComponent, StackMixin, listMixin}
 */
export default class ListBase extends Base {
  static get properties() {
    return {
      bullet: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'bullet') {
      this.container.classList.add('c-list--bullet');
      Array.from(this.children).forEach(item => {
        item.style.display = 'list-item';
      });
    }
  }
}
