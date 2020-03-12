export default function LinkMixin(base) {
  class LinkMixin extends base {
    static get properties() {
      return {
        link: {
          type: 'string'
        }
      };
    }

    constructor() {
      super();
    }
  }
  return LinkMixin;
}
