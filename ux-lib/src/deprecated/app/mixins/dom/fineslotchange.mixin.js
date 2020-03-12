let isEdge = /Edge/.test(navigator.userAgent);

export default function FineSlotChange(base) {
  /**
   * @property {HTMLElement} tag - créé l'élément souhaité
   * @slot - unnamed / default slot
   */
  class FineSlotChangeMixin extends base {
    constructor() {
      super();
    }

    /**
     *
     * @param {HTMLElement} el the element to listen change
     * @param {Function} cb callback
     */
    fineSlotChange(el, cb) {
      this.wrapFunction = () => {
        el.dispatchEvent(
          new CustomEvent('bux-fine-slot-change', {
            bubbles: false,
            cancelable: true
          })
        );
        if (cb && typeof cb === 'function') cb();
      };

      // Edge doesn't handle slot change event
      if (isEdge) {
        this._mutationObserver(el, this.wrapFunction);
      } else {
        el.addEventListener('slotchange', this.wrapFunction);
      }
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) super.disconnectedCallback();
      this.removeEventListener('slotchange', this.wrapFunction);
    }

    // Mutation observer method
    _mutationObserver(el, cb) {
      // instantiate the MutationObserver API
      const observer = new MutationObserver(cb);

      // mutation observer API configuration
      // https://developer.mozilla.org/fr/docs/Web/API/MutationObserver#MutationObserverInit
      const observerConfig = {
        attributes: false, //true si les mutations d’attributs du nœud visé sont à observer.
        childList: true, // true si l’ajout ou la suppression des éléments enfants du nœud visé (incluant les nœuds de texte) sont à observer.
        subtree: true, //	true si les descendants du nœud visé sont également à observer.
        characterData: false, // true si les mutation de texte du nœud visé sont à observer.
        attributeOldValue: false, // true si attributes est true et si la valeur des attributs avant mutation doit être enregistrée.
        characterDataOldValue: false // si characterData est true et si la valeur des données avant mutation doit être enregistrée.
        // attributeFilter: Spécifiez un tableau de noms d’attributs locaux (sans namespace) si vous souhaitez n’observer les mutations que sur une partie des attributs.
      };

      observer.observe(el, observerConfig);
    }
  }
  return FineSlotChangeMixin;
}
