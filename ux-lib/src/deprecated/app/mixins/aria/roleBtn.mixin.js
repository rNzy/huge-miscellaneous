/**
 * Cette mixin permet de rajouter le role bouton
 * sur n'importe le WC et de gérer la touche espace
 */
export default function AriaRoleBtnMixin(base) {
  class AriaRoleBtnMixin extends base {
    constructor() {
      super();
      this.setAttribute('role', 'button');
      this.setAttribute('tabindex', '0');
      this.handleBtnKeyUp = this.handleBtnKeyUp.bind(this);
    }

    handleBtnKeyUp(e) {
      // Touche espace appuyer
      if (e.keyCode === 32) this.click();
    }

    connectedCallback() {
      this.addEventListener('keyup', this.handleBtnKeyUp);
    }

    disconnectedCallback() {
      this.removeEventListener('keyup', this.handleBtnKeyUp);
    }
  }
  return AriaRoleBtnMixin;
}
