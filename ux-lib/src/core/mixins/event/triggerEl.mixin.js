export default function TriggerElMixin(base) {
  /**
   * Cette Mixin permet de toggle la propriete open d'un element cible.
   *
   * Lorsque l'on clique sur le this.container de l'element qui
   * étend cette classe cette mixin va inverser la prop open
   * de la targetId
   *
   * @class TriggerElMixin
   * @extends {base}
   *
   * @prop {String} targetId - l'id de l'élément cible
   *
   * @prop {Function} triggerTarget - toggle open du target id
   *
   */
  class TriggerElMixin extends base {
    static get properties() {
      return {
        targetId: {
          type: 'string'
        }
      };
    }

    constructor() {
      super();
      this.triggerTarget = this.triggerTarget.bind(this);
      this.onWire = false;
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();

      // Ne remet pas 2 fois l'event
      if (this.onWire) return;

      this.container.addEventListener('click', this.triggerTarget);
      this.onWire = true;
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) super.disconnectedCallback();
      this.container.removeEventListener('click', this.triggerTarget);
      this.onWire = false;
    }

    triggerTarget() {
      if (!this.targetId) return;

      const target = document.getElementById(this.targetId);

      if (!target) return;

      // la cible doit avoir une propriété "open" pour que ça fonctionne
      // ex: modal
      target.open = !target.open;
    }
  }
  return TriggerElMixin;
}
