import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import TextSizeMixin from '../../../mixins/typography/textSize.mixin.js';
import BoldMixin from '../../../mixins/typography/bold.mixin.js';
import ItalicMixin from '../../../mixins/typography/italic.mixin';
import UppercaseMixin from '../../../mixins/typography/uppercase.mixin.js';
import TextAlignmentMixin from '../../../mixins/typography/textAlignment.mixin.js';
import TagMixin from '../../../mixins/dom/tag.mixin.js';
import ColorThemeMixin from '../../../mixins/typography/color-theme.mixin';

import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin';

const Base = TagMixin(
  ColorThemeMixin(
    TextAlignmentMixin(
      UppercaseMixin(
        ItalicMixin(
          BoldMixin(TextSizeMixin(AriaHiddenStyleMixin(BaseShadowComponent)))
        )
      )
    )
  )
);

import styleDefault from './text.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<span class="js-container m-tag"><slot></slot></span>';

/**
 * Composant permettant d'afficher du texte dans différentes balises html. Par défaut ux-text crée une balise span.
 *
 * @element ux-text
 *
 * @prop {Boolean} block - met le texte en display block
 * @prop {Boolean} a11yHidden - permet de cacher visuellement le composant tout en le vocalisant
 *
 * @slot default
 *
 * @export
 * @class TextBase
 * @extends {BaseShadowComponent, TextSizeMixin, BoldMixin, ItalicMixin, TextAlignmentMixin, UppercaseMixin, AriaHiddenStyleMixin, ColorThemeMixin, TagMixin}
 */
export class TextBase extends Base {
  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }

  static get properties() {
    return {
      block: { type: 'boolean' },
      a11yHidden: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    if (!this.container) return;

    switch (name) {
      case 'block':
        this.setBooleanClass(this.block, 'c-text--block');
        break;
      case 'a11y-hidden':
        this.setBooleanClass(this.a11yHidden, 'a11y-hidden');
        break;
    }
  }
}
