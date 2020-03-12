import {
  SvgBase,
  init
} from '../../../../core/components/images-icones/svg/svg.component';

import styleDefault from './svg.style.css';

/**
 * Ce composant permet d'afficher des icones.
 * Tous les icones pour une librairie doivent être enregistrés dans le dossier assets/icons au sein de la librairie.
 * Ou importés au sein même du composant si l'icone est spécifique.
 */
export default class Svg extends SvgBase {
  static get style() {
    return styleDefault.toString();
  }
}

init(Svg);
