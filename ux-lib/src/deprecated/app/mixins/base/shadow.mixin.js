export default function ShadowMixin(base) {
  class ShadowMixin extends base {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.$ = this.shadowRoot;
    }
  }
  return ShadowMixin;
}
