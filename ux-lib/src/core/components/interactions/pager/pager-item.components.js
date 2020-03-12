import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import BtnNoStyle from '../../../mixins/styles/btnNoStyle.mixin';

import style from './pager-item.style.css';

const Base = BtnNoStyle(BaseShadowComponent);

const tplBtn = document.createElement('template');
tplBtn.innerHTML =
  '<button class="c-pager-item js-container m-btn-no-style"></button>';

const tplLink = document.createElement('template');
tplLink.innerHTML = '<a class="c-pager-item js-container"></a>';

/**
 * Permet de créer un lien vers une page spécifique dans l'ux-pager.
 *
 * @element ux-pager-item
 *
 * @prop {Number|'first'|'prev'|'ellipsis'|'next'|'last'} value - valeur égale au numéro de la page ou à un texte parmi les valeurs autorisées
 * @prop {'btn'|'link'} type - Génère soit un bouton soit un lien
 * @prop {Boolean} selected - la page est-elle selectionnée ?
 *
 * @export
 * @class PagerItemBase
 * @extends {BaseShadowComponent, BtnNoStyle}
 */

export default class PagerItemBase extends Base {
  static get properties() {
    return {
      type: { type: 'string' },
      value: { type: 'string' },
      selected: { type: 'boolean' }
    };
  }

  static get style() {
    return style.toString();
  }

  template() {
    if (this.getAttribute('type') === 'link') {
      return tplLink;
    } else {
      return tplBtn;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.setAttribute('role', 'listitem');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'value') {
      // Remove old class
      this.container.className = this.container.className.replace(
        /c-pager-item--\w*/g,
        ''
      );

      switch (this.value) {
        case 'first':
          this.setAttribute('title', 'Afficher la première page');
          this.container.classList.add('c-page-item--first');
          this.container.innerHTML = '<<';
          this.container.setAttribute(
            'aria-label',
            'Afficher la première page'
          );
          break;
        case 'prev':
          this.setAttribute('title', 'Afficher la page précédente');
          this.container.classList.add('c-page-item--prev');
          this.container.innerHTML = '<';
          this.container.setAttribute(
            'aria-label',
            'Afficher la page précédente'
          );
          break;
        case 'ellipsis':
          this.container.innerHTML = '...';
          this.container.classList.add('c-page-item--ellipsis');
          this.container.setAttribute('aria-label', 'Ellipse');
          break;
        case 'next':
          this.setAttribute('title', 'Afficher la page suivante');
          this.container.classList.add('c-page-item--next');
          this.container.innerHTML = '>';
          this.container.setAttribute(
            'aria-label',
            'Afficher la page suivante'
          );
          break;
        case 'last':
          this.setAttribute('title', 'Afficher la dernière page');
          this.container.classList.add('c-page-item--last');
          this.container.innerHTML = '>>';
          this.container.setAttribute(
            'aria-label',
            'Afficher la dernière page'
          );
          break;
        default:
          this.setAttribute('title', `Afficher la page ${this.value}`);
          this.container.innerHTML = this.value;
          this.container.setAttribute(
            'aria-label',
            `Afficher la page ${this.value}`
          );
          break;
      }
    } else if (name === 'selected') {
      this.setBooleanClass(this.selected, 'c-pager-item--selected');
      this.selected
        ? this.container.setAttribute('aria-current', 'page')
        : this.container.removeAttribute('aria-current');
    }
  }
}
