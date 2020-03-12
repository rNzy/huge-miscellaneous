import Base from './base.mixin';
import PropertiesMixin from './properties.mixin.js';
import TemplateMixin from './template.mixin';

/**
 * @class always extends HTMLElement
 */

// Do not use style mixin.
// Style for NoShadowComponent is global
export default class BaseShadowComponent extends TemplateMixin(
  PropertiesMixin(Base)
) {}
