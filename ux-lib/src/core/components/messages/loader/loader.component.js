import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

import debounce from 'lodash.debounce';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML =
  '<div class="c-loader c-loader__overlay js-container"><div class="c-loader__animated"></div></div>';

export default class LoaderBase extends Base {
  static get properties() {
    return {
      loading: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name == 'loading')
      debounce(() => this._toggleLoading(this.loading), 150)();
  }

  _toggleLoading(loading) {
    if (loading) {
      this.container.style.display = '';
      setTimeout(() => {
        this.container.classList.add('is-loading');
      }, 250); // nb this time should be the same than animation in css
    } else {
      this.container.classList.remove('is-loading');
      setTimeout(() => {
        this.container.style.display = 'none';
      }, 250); // nb this time should be the same than animation in css
    }
  }
}
