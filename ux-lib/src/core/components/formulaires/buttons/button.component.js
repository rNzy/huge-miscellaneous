import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import OutlinedMixin from '../../../../core/mixins/styles/btnOutlined.mixin';
import BtnNoStyle from '../../../mixins/styles/btnNoStyle.mixin';
import TriggerElMixin from '../../../mixins/event/triggerEl.mixin';
import ElementAlignmentMixin from '../../../mixins/layout/elementAlignment.mixin';
import DelegateFocusMixin from '../../../mixins/aria/delegateFocus.mixin';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin';

const Base = DelegateFocusMixin(
  ElementAlignmentMixin(
    BtnNoStyle(
      OutlinedMixin(TriggerElMixin(AriaHiddenStyleMixin(BaseShadowComponent)))
    )
  )
);

const tpl = document.createElement('template');
tpl.innerHTML =
  '<button class="c-btn js-container js-delegate-focus"><slot></slot></button>';

/**
 * Composant qui permet d'afficher des boutons d'actions
 *
 * @element ux-btn
 *
 * @prop {"primary"|"secondary"|"tertiary"}  model - définit l'apparence du bouton
 * @prop {Boolean} disabled - indique si le bouton est désactivé
 * @prop {String} a11yLabel - texte de vocalisation du bouton
 * @prop {String} type - le type, par exemple submit
 * @prop {Boolean} noStyle - paramètre permettant de supprimer tout style au bouton
 * @prop {String} libTitle - ajoute un attribut title
 *
 * @slot - default
 *
 * @export
 * @class ButtonBase
 * @extends {BaseShadowComponent, TriggerElMixin, OutlinedMixin, BtnNoStyle, ElementAlignmentMixin, DelegateFocusMixin, AriaHiddenStyleMixin}
 */
export default class ButtonBase extends Base {
  static get properties() {
    return {
      model: {
        type: 'string'
      },
      disabled: {
        type: 'boolean'
      },
      a11yLabel: {
        type: 'string'
      },
      type: {
        type: 'string'
      },
      noStyle: {
        type: 'boolean'
      },
      libTitle: {
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
    if (!this.container) return;
    switch (name) {
      case 'model':
        this._setModel();
        break;
      case 'disabled':
        this.setBooleanClass(this.disabled, 'c-btn--disabled');
        break;
      case 'no-style':
        this._setNoStyle();
        break;
      case 'a11y-label':
        this._setAccessibilityLabel();
        break;
      case 'lib-title':
        this._setTitle();
        break;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    this._setTitle();
  }

  // @todo fix this
  // Ici potentiel bug car on a deux méthodes pour mettre nostyle
  // soit avec model="nostyle" soit avec nostyle="true"
  _setModel() {
    switch (this.model) {
      case 'primary':
      case 'secondary':
      case 'tertiary':
        this.container.classList.remove(
          'm-btn-no-style',
          'c-btn--primary',
          'c-btn--secondary',
          'c-btn--tertiary'
        );
        this.container.classList.add('c-btn', `c-btn--${this.model}`);
        break;
      case 'nostyle':
        this.container.classList.remove(
          'c-btn',
          'c-btn--primary',
          'c-btn--secondary',
          'c-btn--tertiary'
        );
        this.container.classList.add('m-btn-no-style');
    }
  }

  _setAccessibilityLabel() {
    if (this.a11yLabel) {
      this.container.setAttribute('aria-label', this.a11yLabel);
    } else {
      this.container.removeAttribute('aria-label');
    }
  }

  _setTitle() {
    const spanAlready = this.container.innerHTML.includes(
      'span class="a11y-hidden"'
    );
    if (this.libTitle && this.libTitle !== null) {
      this.container.setAttribute('title', this.libTitle);
      if (spanAlready) this.container.querySelector('.a11y-hidden').remove();

      this.container.innerHTML += `<span class="a11y-hidden">${this.libTitle}</span>`;
    } else {
      this.container.removeAttribute('title');
      if (spanAlready) this.container.querySelector('.a11y-hidden').remove();
    }
  }

  _setNoStyle() {
    if (this.noStyle) {
      this.container.classList.remove('c-btn');
      this.container.classList.add('m-btn-no-style');
    } else {
      this.container.classList.add('c-btn');
      this.container.classList.remove('m-btn-no-style');
    }
  }
}
