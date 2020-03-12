import styleDefault from './stack.style.css';

export default function StackMixin(base) {
  class StackMixin extends base {
    static get properties() {
      return {
        verticalSpace: {
          type: 'string',
          attributeName: 'space-v'
        },
        horizontalSpace: {
          type: 'string',
          attributeName: 'space-h'
        },
        spaceAll: {
          type: 'boolean',
          attributeName: 'space-all'
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

      switch (name) {
        case 'space-v':
          this.container.classList.add('c-stack');
          this.container.classList.add('c-stack--vertical');
          const vSpaceValue = this._getVerticalSpaceValue();
          this._setStack(vSpaceValue);
          break;
        case 'space-h':
          this.container.classList.add('c-stack');
          this.container.classList.add('c-stack--horizontal');
          const hSpaceValue = this._getHorizontalSpaceValue();
          this._setStack(hSpaceValue);
          break;
      }
    }

    _allChildren() {
      return Array.from(this.children);
    }

    _getVerticalSpaceValue() {
      return `var(--spacing-${this.verticalSpace})`;
    }

    _getHorizontalSpaceValue() {
      return `var(--spacing-${this.horizontalSpace})`;
    }

    _setStack(spaceValue) {
      const children = this._allChildren();
      // vérifie si un élément a un attribut 'block-arrow' ou 'block'
      function isLinkEl(el) {
        return el.hasAttribute('block-arrow') || el.hasAttribute('block');
      }
      // vérifie qu'un des éléments enfant est un lien ou non
      const hasLinkEl = children.some(isLinkEl);
      let items;

      if (this.spaceAll) {
        // lorsqu'on utilise l'attribut spaceAll
        // le style sera attribué à tous les éléments
        items = children;
      } else if (hasLinkEl) {
        // si un élément de type lien est utilisé avec l'attribut
        // block-arrow, le style est attributé à tous les éléments excepté les 2 derniers
        // attention à bien utilisé l'élément lien en dernier
        items = children.slice(0, -2);
      } else {
        // par défaut, le style est appliqué à tous les éléments
        // excepté le dernier
        items = children.slice(0, -1);
      }

      items.forEach(item => {
        if (this.verticalSpace) {
          item.style.marginBottom = spaceValue;
        }
        if (this.horizontalSpace) {
          item.style.marginRight = spaceValue;
        }
        if (!item.style.display) item.style.display = 'block';
      });
    }
  }
  return StackMixin;
}
