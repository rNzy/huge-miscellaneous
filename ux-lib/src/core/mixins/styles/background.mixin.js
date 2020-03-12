import styleDefault from './background.style.css';

export default function BackgroundMixin(base) {
  /**
   *
   *
   * @class BackgroundMixin
   * @extends {base}
   *
   * @prop {Boolean} backgroundBase - mettre un background
   * @prop {Boolean} backgroundLight - mettre un background light
   * @prop {Boolean} backgroundHover - mettre un background sur le hover
   */
  class BackgroundMixin extends base {
    static get properties() {
      return {
        backgroundBase: {
          type: 'boolean'
        },
        backgroundLight: {
          type: 'boolean'
        },
        backgroundHover: {
          type: 'boolean'
        }
      };
    }

    static get style() {
      return styleDefault.toString();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (!this.container) return;

      if (name === 'background-base') {
        if (this.backgroundBase) {
          this.container.style.backgroundColor = 'var(--color-background)';
        } else {
          this.container.style.backgroundColor = this.container.style.backgroundColor.replace(
            'var(--color-background)',
            ''
          );
        }
      } else if (name === 'background-light') {
        if (this.backgroundLight) {
          this.container.style.backgroundColor =
            'var(--color-background-light)';
        } else {
          this.container.style.backgroundColor = this.container.style.backgroundColor.replace(
            'var(--color-background-light)',
            ''
          );
        }
      } else if (name === 'background-hover') {
        this.backgroundHover
          ? this.container.classList.add('m-background-hover')
          : this.container.classList.remove('m-background-hover');
      }
    }
  }
  return BackgroundMixin;
}
