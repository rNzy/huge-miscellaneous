import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const tpl = document.createElement('template');
tpl.innerHTML = `
<a class="c-shortlink js-container" href="">
  <ux-svg lib-size="lg"></ux-svg>
  <span class="c-shortlink__label">
    <slot></slot>
  </span>
</a>
`;

/**
 * Permet de créer un élément qui sert de raccourci avec un label
 * une icone et un lien.
 *
 * @element ux-shortlink
 *
 * @prop {String} libLink - la cible href du lien
 * @prop {String} icon - nom de l'icone à afficher
 * @prop {String} a11yLabel - texte de vocalisation du lien
 *
 * @slot - default(pour le label)
 *
 * @export
 * @class ShortlinkBase
 * @extends {BaseShadowComponent}
 */
export default class ShortlinkBase extends BaseShadowComponent {
  static get properties() {
    return {
      libLink: { type: 'string' },
      a11yLabel: { type: 'string' },
      icon: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.iconEl = this.$.querySelector('ux-svg');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'lib-link':
        this.container.href = this.libLink;
        break;
      case 'icon':
        this.iconEl.setAttribute('icon', this.icon);
        break;
      case 'a11y-label':
        this.container.setAttribute('aria-label', this.a11yLabel);
        break;
    }
  }
}
