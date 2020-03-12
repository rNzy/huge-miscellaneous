import { getConstructorTree } from './utils';

export default function TemplateMixin(base) {
  class TemplateMixin extends base {
    constructor() {
      super();

      let protoTree = getConstructorTree(Object.getPrototypeOf(this));
      let propsConfig = buildTemplate(protoTree);

      if (propsConfig.length === 0) return;

      if (this.$) {
        this.$.appendChild(
          propsConfig[propsConfig.length - 1]
            .bind(this)()
            .content.cloneNode(true)
        );
        this.container = this.$.querySelector('.js-container') || this;
        this._slots = this.$.querySelectorAll('slot');
      } else {
        this.appendChild(
          propsConfig[propsConfig.length - 1]
            .bind(this)()
            .content.cloneNode(true)
        );
        this.container = this.querySelector('.js-container') || this;
      }
    }
  }
  return TemplateMixin;
}

/**
 *
 * @param {*} propertiesName
 * @param {*} protoTree
 */
export const buildTemplate = protoTree => {
  let propsConfig = [];
  for (let parentClass of [...protoTree].reverse()) {
    if (parentClass.hasOwnProperty('template'))
      propsConfig.push(parentClass['template']);
  }
  return propsConfig;
};
