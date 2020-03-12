import styleDefault from './stack.style.css';

export default function StackMixin(base) {
  /**
   *
   *
   * @class StackMixin
   * @extends {base}
   *
   * @prop {String|sm|md|...} spaceV - espacement vertical
   * @attr {String|sm|md|...} space-v - espacement vertical
   * @prop {String|sm|md|...} spaceH - espacement horizontal
   * @attr {String|sm|md|...} space-h - espacement horizontal
   * @prop {boolean} spaceAll - ajoute aussi un espacement sur le dernier élément enfant
   * @attr {boolean} space-all - ajoute aussi un espacement sur le dernier élément enfant
   */
  class StackMixin extends base {
    static get properties() {
      return {
        spaceV: {
          type: 'string'
        },
        spaceH: {
          type: 'string'
        },
        spaceAll: {
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

      if (name === 'space-v' || name === 'space-h' || name === 'space-all')
        this.spaceApply();
    }

    spaceApply() {
      if (!this.container) return;
      this.container.classList.add('c-stack');

      if (this.spaceV) {
        this.container.classList.add('c-stack--vertical');
        this.container.style.setProperty(
          '--stack-size',
          `var(--spacing-${this.spaceV})`
        );
      } else {
        this.container.classList.remove('c-stack--vertical');
      }
      if (this.spaceH) {
        this.container.classList.add('c-stack--horizontal');
        this.container.style.setProperty(
          '--stack-size',
          `var(--spacing-${this.spaceH})`
        );
      } else {
        this.container.classList.remove('c-stack--horizontal');
      }
      if (this.spaceAll) {
        this.container.classList.add('c-stack--all');
      } else {
        this.container.classList.remove('c-stack--all');
      }
    }
  }
  return StackMixin;
}
