import CheckboxGroupBase from '../../../../core/components/formulaires/checkbox/checkbox-group.component';
import styleDefault from './checkbox-group.style.css';

/**
 * This is a checkbox group container
 */
class CheckboxGroup extends CheckboxGroupBase {
  static get properties() {
    return {
      inline: { type: 'boolean' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    if (name === 'inline') {
      this._setInline();
    }
  }

  _setInline() {
    this.inline
      ? this.container.classList.add('c-checkbox-group--inline')
      : this.container.classList.remove('c-checkbox-group--inline');
  }
}

customElements.define('ux-checkbox-group', CheckboxGroup);
