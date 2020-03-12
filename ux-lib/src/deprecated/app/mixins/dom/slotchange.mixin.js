let isEdge = /Edge/.test(navigator.userAgent);

export default function SlotChange(base) {
  /**
   * @property {HTMLElement} tag - créé l'élément souhaité
   * @slot - unnamed / default slot
   */
  class SlotChangeMixin extends base {
    constructor() {
      super();
      this.buxSlotChangeEvent = this.buxSlotChangeEvent.bind(this);

      // Edge doesn't handle slot change event
      if (isEdge) {
        this._mutationObserver();
      } else {
        this._slots.forEach(slot => {
          slot.addEventListener('slotchange', this.buxSlotChangeEvent);
        });
      }
    }

    buxSlotChangeEvent() {
      this.dispatchEvent(
        new CustomEvent('bux-slot-change', {
          bubbles: false,
          cancelable: true
        })
      );
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) super.disconnectedCallback();
      this.removeEventListener('slotchange', this.buxSlotChangeEvent);
    }

    // Mutation observer method
    _mutationObserver() {
      // instantiate the MutationObserver API
      const observer = new MutationObserver(() => {
        this.buxSlotChangeEvent();
      });

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

      observer.observe(this, observerConfig);
    }
  }
  return SlotChangeMixin;
}
