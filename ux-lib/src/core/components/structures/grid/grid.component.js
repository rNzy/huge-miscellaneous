import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

import styleDefault from './grid.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="js-container c-grid"></div>`;

/**
 * Crée un élément CSS-grid. En vue mobile, tout passe sur une seule colonne.
 *
 * @element ux-grid
 *
 * @prop {"1-1"|"1-2"|"2-1"|"1-3"|"3-1"|"1-4"|"1-5"|"1-6"|"1-1-1"|"1-1-2"|"1-2-1"|"2-1-1"|"1-1-1-1"} columns - nombre et largeur relative des colonnes désirées
 * @prop {"xs"|"sm"|"md"|"lg"|"xl"|"xxl"} [gap] - ajoute une gouttière entre les colonnes
 *
 * @slot variable=column_number
 *
 * @export
 * @class GridBase
 * @extends {BaseShadowComponent, StackMixin}
 */
export default class GridBase extends Base {
  static get properties() {
    return {
      columns: {
        type: 'string'
      },
      gap: {
        type: 'string'
      }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'columns':
        const colNumber = newValue.split('-').length;

        if (colNumber < 2) {
          this.container.innerHTML =
            'Attention ! Ne pas utiliser ux-grid pour une seule colonne.';
        } else if (colNumber > 6) {
          this.container.innerHTML =
            'Attention ! Ux-grid ne supporte que 6 colonnes !';
        } else {
          this.container.classList.add(`c-grid--${newValue}`);
          for (let i = 1; i <= colNumber; i++) {
            this.container.innerHTML += `<slot name="${i}"></slot>`;
          }
        }
        break;
      case 'gap':
        if (this.gap) {
          this.container.classList.add('c-grid--gap');
          this.container.style.setProperty(
            '--gap-size',
            `var(--spacing-${this.gap})`
          );
        } else {
          this.container.classList.remove('c-grid--gap');
        }
        break;
    }
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}
