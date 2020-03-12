import Base from './base.mixin';
import PropertiesMixin from './properties.mixin';
import ShadowMixin from './shadow.mixin';
import StyleMixin from './style.mixin';
import TemplateMixin from './template.mixin';

/**
 * @class always extends HTMLElement
 */
export default class BaseShadowComponent extends TemplateMixin(
  StyleMixin(ShadowMixin(PropertiesMixin(Base)))
) {}
