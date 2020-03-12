import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import hiddenStyle from '../../../mixins/aria/hidden-style.mixin';

import style from './link-blank.style.css';

import './link-blank.svg';

const Base = hiddenStyle(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `<a class="c-link-blank js-container" target="_blank" rel="noopener noreferrer" title="ouverture dans une nouvelle fenêtre">
    <slot></slot>
  </a>
  <ux-svg class="c-link-blank--svg" aria-hidden="true" icon="link-blank" lib-size="sm"></ux-svg>`;

/**
 * Permet de créer un lien ouvrant dans une nouvelle fenêtre avec une icone explicite. Vocalise l'ouverture dans une nouvelle fenêtre.
 *
 * @element ux-link-blank
 *
 * @prop {String} libLink - la cible href du lien
 * @prop {String} a11yLabel - texte de vocalisation du lien
 *
 * @slot default
 *
 * @export
 * @class LinkBlankBase
 * @extends {BaseShadowComponent, hiddenStyle}
 */

export default class LinkBlankBase extends Base {
  static get properties() {
    return {
      libLink: { type: 'string' },
      a11yLabel: { type: 'string' }
    };
  }

  static get style() {
    return style.toString();
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'lib-link') {
      const linkEl = this.$.querySelector('.c-link-blank');
      this.libLink
        ? linkEl.setAttribute('href', this.libLink)
        : linkEl.removeAttribute('href');
    } else if (name === 'a11y-label') {
      this.a11yLabel
        ? this.container.setAttribute('aria-label', this.a11yLabel)
        : this.container.removeAttribute('aria-label');
    }
  }
}
