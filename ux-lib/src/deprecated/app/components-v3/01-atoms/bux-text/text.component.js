import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import TextSizeMixin from '../../../mixins/typography/textSize.mixin.js';
import BoldMixin from '../../../mixins/typography/bold.mixin.js';
import ItalicMixin from '../../../mixins/typography/italic.mixin.js';
import UppercaseMixin from '../../../mixins/typography/uppercase.mixin.js';
import ColorThemeMixin from '../../../mixins/typography/color-theme.mixin.js';
import TextAlignmentMixin from '../../../mixins/typography/textAlignment.mixin.js';
import TagMixin from '../../../mixins/dom/tag.mixin.js';
import BackgroundMixin from '../../../mixins/styles/background.mixin.js';

const Base = BackgroundMixin(
  TagMixin(
    TextAlignmentMixin(
      ColorThemeMixin(
        UppercaseMixin(
          ItalicMixin(BoldMixin(TextSizeMixin(BaseShadowComponent)))
        )
      )
    )
  )
);

const tpl = document.createElement('template');
tpl.innerHTML = '<span class="js-container m-tag"><slot></slot></span>';

import styleDefault from './text.style.css';

/**
 * Component to display any type of text
 *
 * @element bux2-text
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 * @extends {TextSizeMixin, BoldMixin, ItalicMixin, TextAlignmentMixin, UppercaseMixin} use typography mixins
 * @extends {TagMixin} used to declare root element using any HTMLElement
 * @extends {BackgroundMixin} add background color capacity
 *
 */
export class Text extends Base {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    if (!this.container) return;

    switch (name) {
      case 'background':
        if (!this.container) return;
        if (this.background) {
          this.container.classList.add('c-text--background');
        } else {
          this.container.classList.remove('c-text--background');
        }
        break;
      case 'background-light':
        if (!this.container) return;
        if (this.backgroundLight) {
          this.container.classList.add('c-text--background-light');
        } else {
          this.container.classList.remove('c-text--background-light');
        }
        break;
    }
  }
}

window.customElements.define('bux2-text', Text);
