// Export global var for efs
window.uxEfs = 'backoffice';

import { requireAll } from '../../../build-utils/utils';

// Import Icons
requireAll(require.context('./icons', true, /\.svg$/));

// Import images
// requireAll(require.context('./images', true, /\.(png|jpg|jpeg|gif)$/));

// Fonts

// requireAll(require.context('./fonts', true, /\.(woff|woff2)$/));

// import css
import './../../core/styles/core.style.css';
import './css/settings.css';

/**
 * @description Import components
 * ceci importera tous les composants du thème
 * vous pouvez l'overrider et créer votre propre
 * liste d'imports
 * Attention à bien pointer vers la bonne librairie
 */

import '../../libraries/back-office/index';

import './images/logo.png';
