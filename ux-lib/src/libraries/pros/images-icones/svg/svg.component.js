import {
  SvgBase,
  init
} from '../../../../core/components/images-icones/svg/svg.component';

import styleDefault from './svg.style.css';

export default class Svg extends SvgBase {
  static get style() {
    return styleDefault.toString();
  }
}

init(Svg);
