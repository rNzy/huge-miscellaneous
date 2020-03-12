import LabelBase from '../../../../core/components/formulaires/label/label.component.js';
import styleDefault from './label.style.css';

import './cross.png';
import './valid.png';

const tpl = document.createElement('template');
tpl.innerHTML = `<label class="c-label js-container"><slot></slot></label>`;

/**
 * Composant affichant un label.
 * Ce label peut "contenir" l'ux-input au sein de son slot.
 * Pour cibler correctement l'ux-input on peut rajouter
 * à celui-ci l'attribut ux-label-target.
 */
class Label extends LabelBase {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    const label = tpl.content.querySelector('label');
    label.setAttribute(
      'style',
      `--c-label-bg-valid:url(${this.uxLibUrl}/assets/images/valid.png);--c-label-bg-error:url(${this.uxLibUrl}/assets/images/cross.png)`
    );
    return tpl;
  }
}

customElements.define('ux-label', Label);
