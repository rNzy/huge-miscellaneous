import { getConstructorTree } from '../../../../core/base/utils';

export default function StylesMixin(base) {
  class StylesMixin extends base {
    constructor() {
      super();
      let protoTree = getConstructorTree(Object.getPrototypeOf(this));
      let propsConfig = buildConstructorStyle(protoTree);
      const tpl = document.createElement('template');
      tpl.innerHTML = `<style>${propsConfig.join('')}</style>`;
      if (this.$) {
        window.ShadyCSS &&
          ShadyCSS.prepareTemplate(tpl, this.tagName.toLowerCase());
        this.$.appendChild(tpl.content.cloneNode(true));
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      window.ShadyCSS && ShadyCSS.styleElement(this);
    }
  }
  return StylesMixin;
}

/**
 *
 * @param {*} propertiesName
 * @param {*} protoTree
 */
export const buildConstructorStyle = protoTree => {
  let propsConfig = [];
  for (let parentClass of [...protoTree].reverse()) {
    if (parentClass.constructor.hasOwnProperty('style'))
      propsConfig.push(parentClass.constructor['style']);
  }
  return propsConfig;
};
