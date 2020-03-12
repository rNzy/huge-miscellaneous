import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import BtnNoStyle from '../../../mixins/styles/btnNoStyle.mixin';
import hiddenStyle from '../../../mixins/aria/hidden-style.mixin';

import style from './link.style.css';

import './link.svg';

const Base = BtnNoStyle(hiddenStyle(BaseShadowComponent));

const tplBtn = document.createElement('template');
tplBtn.innerHTML =
  '<button class="c-link js-container m-btn-no-style"><slot></slot></button><ux-svg aria-hidden="true" class="c-link__arrow" icon="link" lib-size="sm"></ux-svg>';

const tplLink = document.createElement('template');
tplLink.innerHTML =
  '<a class="c-link js-container"><slot></slot></a><ux-svg aria-hidden="true" class="c-link__arrow" icon="link" lib-size="sm"></ux-svg>';

/**
 * Permet de créer un lien.
 *
 * @element ux-link
 *
 * @prop {String} libLink - la cible href du lien
 * @prop {String} [libTitle] - le title du lien
 * @prop {Boolean} [btn=false] - génère un lien avec l'apparence d'un bouton
 * @prop {String} a11yLabel - texte de vocalisation du lien
 * @prop {Boolean} [arrow=true] - affiche un chevron symbolisant le lien
 *
 * @slot default
 *
 * @export
 * @class LinkBase
 * @extends {BaseShadowComponent, hiddenStyle, BtnNoStyle}
 */

export default class LinkBase extends Base {
  static get properties() {
    return {
      libLink: { type: 'string' },
      libTitle: { type: 'string' },
      btn: { type: 'boolean', defaultValue: 'false' },
      a11yLabel: { type: 'string' },
      arrow: { type: 'boolean', defaultValue: 'true' }
    };
  }

  static get style() {
    return style.toString();
  }

  template() {
    if (this.btn) return tplBtn;
    return tplLink;
  }

  constructor() {
    super();
    this.linkEl = this.$.querySelector('.c-link');
    this.arrowEl = this.$.querySelector('.c-link__arrow');
    this.injectStyle = null;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // Attendre un cycle de digestion
    window.setTimeout(() => {
      // Gérer l'affichage de l'arrow
      this.handleArrow();

      // Met une marge nulle à l'élément juste avant lui
      this.fixMarginWithStackMixin();
    }, 0);
  }

  /**
   * Si le parent à la stack mixin
   * alors une marge va etre appliquer sur l'avant dernier element
   * il faut supprimer celle-ci
   */
  fixMarginWithStackMixin() {
    // Si on arrive a accéder au container
    if (this.parentElement && this.parentElement.container) {
      if (this.parentElement.hasAttribute('space-v')) {
        this.previousElementSibling.style.marginBottom = 0;
      }
    }
  }

  /**
   * Cette fonction affiche ou pas l'arrow
   * Rajoute un padding à droite a l'element parent
   * pour l'afficher l'arrow
   */
  handleArrow() {
    // Si on arrive a accéder au container
    if (this.parentElement) {
      if (this.arrow) {
        // Doit afficher le arrow
        if (this.injectStyle) return;
        this.injectStyle = document.createElement('style');
        this.injectStyle.innerHTML = `
        .m-link {
          position: relative;
          padding-right: calc( var(--c-link-width) + 15px ) !important;
        }
      `;

        if (this.parentElement.$) {
          this.parentElement.$.insertBefore(
            this.injectStyle,
            this.parentElement.$.firstChild
          );
        }

        if (this.parentElement.container)
          this.parentElement.container.classList.add('m-link');

        // Affiche arrow
        this.arrowEl.style.display = '';
      } else {
        // Ne dois pas affiche l'arrow
        if (this.injectStyle) {
          this.injectStyle.remove();
          this.injectStyle = null;
        }

        if (this.parentElement.container)
          this.parentElement.container.classList.remove('m-link');

        // N'affiche pas arrow
        this.arrowEl.style.display = 'none';
      }
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'lib-link':
        this.libLink
          ? this.linkEl.setAttribute('href', this.libLink)
          : this.linkEl.removeAttribute('href');
        break;
      case 'lib-title':
        this.libTitle
          ? (this.linkEl.title = this.libTitle)
          : (this.linkEl.title = '');
        break;
      case 'arrow':
        this.handleArrow();
        break;
      case 'a11y-label':
        this.a11yLabel
          ? this.linkEl.setAttribute('aria-label', this.a11yLabel)
          : this.linkEl.removeAttribute('aria-label');
        break;
    }
  }
}
