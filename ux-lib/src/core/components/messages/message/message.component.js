import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-message js-container">
  <slot name="icon"></slot>
  <div class="c-message-content"><slot ></slot></div>
</div>
`;

/**
 * Composant affichant un message.
 *
 * @element ux-message
 *
 * @prop {"warning"|"error"|"info"} type - type d'affichage du message
 *
 * @slot - default
 *
 * @export
 * @class MessageBase
 * @extends {BaseShadowComponent}
 */
export default class MessageBase extends Base {
  static get properties() {
    return {
      type: {
        type: 'string'
      }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'type') this._setType();
  }

  _setType() {
    this.container.setAttribute('class', 'c-message js-container');
    this.container.classList.add(`c-message--${this.type}`);
  }
}
