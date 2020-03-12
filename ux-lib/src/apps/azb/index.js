// Export global var for efs
window.uxEfs = 'azb';

import { requireAll } from '../../../build-utils/utils';

// import css
import './css/settings.css';

// Deprecated components and css
import './../../deprecated/assets/scss-v2/main_azb.scss';
import './../../deprecated/assets/scss/main_azb.scss';
import './../../deprecated/azb.import';

// Import Icons
requireAll(require.context('./icons', true, /\.svg$/));

// Import images
requireAll(require.context('./images', true, /\.(png|jpg|jpeg|gif)$/));

/**
 * @description Import components
 * ceci importera tous les composants du thème
 * vous pouvez l'overrider et créer votre propre
 * liste d'imports
 * Attention à bien pointer vers la bonne librairie
 */
import '../../libraries/azb/index';
