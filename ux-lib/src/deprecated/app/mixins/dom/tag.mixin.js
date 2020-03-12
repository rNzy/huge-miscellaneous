export default function TagMixin(base) {
  /**
   * @property {HTMLElement} tag - créé l'élément souhaité
   * Il faut que dans la classe qui utilise cette mixin il y est dans le template
   * un element avec la classe .m-tag
   *
   * @slot - défaut
   */
  class TagMixin extends base {
    static get properties() {
      return {
        tag: {
          type: 'string'
        }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;

      if (name === 'tag') {
        const toReplace = this.$.querySelector('.m-tag');

        if (toReplace) {
          // Ne fait rien si c'est le meme tag
          if (toReplace.tagName.toLowerCase() === this.tag) return;

          const parent = toReplace.parentNode;

          // Créé le nouvel element
          const newEl = document.createElement(this.tag);

          // Recopier tout les attributs de l'ancien el sur le nouveau
          for (let i = 0, l = toReplace.attributes.length; i < l; i++) {
            const attr = toReplace.attributes[i];
            newEl.setAttribute(attr.nodeName, attr.nodeValue);
          }

          // Bouge tout les enfants de l'ancien et le met dans le nouveau
          while (toReplace.childNodes.length > 0) {
            newEl.appendChild(toReplace.childNodes[0]);
          }

          // Remplace dans le parent le nouvel el
          parent.replaceChild(newEl, toReplace);

          // Re-selectionne le container
          this.container = this.$.querySelector('.js-container');
          if (!this.container) this.container = this;
        }
      }
    }
  }
  return TagMixin;
}
