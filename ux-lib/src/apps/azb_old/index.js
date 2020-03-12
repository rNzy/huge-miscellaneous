// Export global var for efs
window.uxEfs = 'azb_old';

import { requireAll } from '../../../build-utils/utils';

// Deprecated components and css
import './../../deprecated/assets/scss/main_azb_old.scss';
import './../../deprecated/azb.import';

// Import Icons
requireAll(require.context('./icons', true, /\.svg$/));

// Import images
requireAll(require.context('./images', true, /\.(png|jpg|jpeg|gif)$/));

// Fonts
requireAll(require.context('./fonts', true, /\.(woff|woff2)$/));
