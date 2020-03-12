// Export global var for efs
window.uxEfs = 'cmb';

import { requireAll } from '../../../build-utils/utils';

// Deprecated components and css
import './../../deprecated/assets/scss-v2/main_cmb.scss';
import './../../deprecated/assets/scss/main_cmb.scss';
import './../../deprecated/cmx.part.import';

// Import Icons
requireAll(require.context('./icons', true, /\.svg$/));

// Import images
requireAll(require.context('./images', true, /\.(png|jpg|jpeg|gif)$/));

// Fonts
requireAll(require.context('./fonts', true, /\.(woff|woff2)$/));

// import css
import './../../core/styles/core.style.css';
import './css/settings.css';

/**
 * @description Import components
 * ceci importera tous les composants du thème
 * vous pouvez l'overrider et créer votre propre
 * liste d'imports
 */

import '../../libraries/cmxnew/index';
