export default function LinkMixin(base) {
  /**
   *
   *
   * @class LinkMixin
   * @extends {base}
   *
   * @prop {String} libLink - lien
   */
  class LinkMixin extends base {
    static get properties() {
      return {
        libLink: {
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
