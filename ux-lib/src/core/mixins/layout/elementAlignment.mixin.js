export default function ElementAlignmentMixin(base) {
  /**
   *
   * @class ElementAlignmentMixin
   * @extends {base}
   *
   * @prop {Boolean} [center=false] - centrer l'élément
   * @prop {Boolean} [left=false] - aligner à gauche l'élément
   * @prop {Boolean} [right=false] - aligner à droite l'élément
   */
  class ElementAlignmentMixin extends base {
    static get properties() {
      return {
        center: {
          type: 'boolean'
        },
        left: {
          type: 'boolean'
        },
        right: {
          type: 'boolean'
        }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      switch (name) {
        case 'center':
          if (this.center) {
            this.container.classList.add('center');
            this.container.style.marginLeft = 'auto';
            this.container.style.marginRight = 'auto';

            // corrige un bug d'alignement du texte dans les boutons qui passaient
            // de 'flex' à 'block'.
            // @todo vérifier sur d'autre composant peuvent être concerné, voir aussi
            // pour les attributs left et center, et attention aux tests
            if (this.tagName == 'UX-BTN') {
              this.container.style.display = 'flex';
            } else {
              this.container.style.display = 'block';
            }
          } else {
            this.container.classList.remove('center');
            this.container.style.removeProperty('margin-left');
            this.container.style.removeProperty('margin-right');
            this.container.style.removeProperty('display');
          }
          break;
        case 'left':
          if (this.left) {
            this.container.classList.add('left');
            this.container.style.marginRight = 'auto';
            if (this.tagName == 'UX-BTN') {
              this.container.style.display = 'flex';
            } else {
              this.container.style.display = 'block';
            }
          } else {
            this.container.classList.remove('left');
            this.container.style.removeProperty('margin-right');
            this.container.style.removeProperty('display');
          }
          break;
        case 'right':
          if (this.right) {
            this.container.classList.add('right');
            this.container.style.marginLeft = 'auto';
            if (this.tagName == 'UX-BTN') {
              this.container.style.display = 'flex';
            } else {
              this.container.style.display = 'block';
            }
          } else {
            this.container.classList.remove('right');
            this.container.style.removeProperty('margin-left');
            this.container.style.removeProperty('display');
          }
          break;
      }
    }
  }
  return ElementAlignmentMixin;
}
