import {
  SvgBase,
  init
} from '../../../../core/components/images-icones/svg/svg.component';

import styleDefault from './svg.style.css';

/**
 * Ce composant permet d'afficher des icones.
 * Tous les icones pour une apps doivent etre dans le dossier icons au sein de l'apps.
 * Ou importer au sein même du composant si l'icone est spécifique
 *
 * @export
 * @class SvgBase
 * @extends {BaseShadowComponent}
 *
 * @prop {String} icon - nom de l'icone
 * @prop {sm|md|lg|xl|any} [lib-size=md] - taille
 * @prop {Boolean} [circle=false] - entourer l'icone d'un cercle
 * @prop {Number} [rotate=0] - Faire une rotation à l'icone
 *
 */
export default class Svg extends SvgBase {
  static get style() {
    return styleDefault.toString();
  }
}

init(Svg);
