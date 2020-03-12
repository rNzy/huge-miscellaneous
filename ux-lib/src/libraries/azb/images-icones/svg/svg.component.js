import {
  SvgBase,
  init
} from '../../../../core/components/images-icones/svg/svg.component';

import styleDefault from './svg.style.css';

/**
 * @export
 * @class SVGAllianz
 * @extends {SvgBase}
 *
 * @prop {String} state - état du svg
 *
 * @slot - default
 */

export default class Svg extends SvgBase {
  static get style() {
    return styleDefault.toString();
  }

  static get properties() {
    return {
      state: {
        type: 'string'
      }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    else {
      this.container.classList.remove(
        'c-svg--info',
        'c-svg--success',
        'c-svg--error'
      );
      this.container.classList.add(`c-svg--${this.state}`);
    }
  }
}

init(Svg);
