import ButtonBase from './button.component';

const tpl = document.createElement('template');
tpl.innerHTML =
  '<a class="c-btn c-btn-lib-link js-container js-delegate-focus" href><slot></slot></a>';

/**
 * Affiche un lien avec l'esthétique d'un bouton
 *
 * @element ux-link-btn
 *
 * @prop {String} libLink - la cible href du lien
 * @prop {Boolean} targetBlank - ouvre le lien dans une nouvelle fenêtre
 *
 * @slot - défaut
 *
 * @export
 * @class LinkButtonBase
 * @extends {ButtonBase}
 */
export default class LinkButtonBase extends ButtonBase {
  static get properties() {
    return {
      libLink: { type: 'string' },
      targetBlank: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this.handleClick = e => {
      e.preventDefault();
    };

    this.container.addEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    switch (name) {
      case 'lib-link':
        if (this.libLink) {
          this.container.setAttribute('href', this.libLink);
          this.container.removeEventListener('click', this.handleClick);
        } else {
          this.container.setAttribute('href', '');
          this.container.addEventListener('click', this.handleClick);
        }

        break;
      case 'target-blank':
        if (this.targetBlank) {
          this.container.setAttribute('target', '_blank');
          this.container.setAttribute(
            'title',
            'ouverture dans une nouvelle fenêtre'
          );
          this.container.setAttribute('rel', 'noreferrer noopener');
        }
        break;
    }
  }
}
