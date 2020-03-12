// Export global var for efs
window.uxEfs = 'cmsopro';

import { requireAll } from '../../../build-utils/utils';

// Deprecated components and css
import './../../deprecated/assets/scss-v2/main_cmsopro.scss';
import './../../deprecated/cmx.pro.import';

// Import Icons
requireAll(require.context('./icons', true, /\.svg$/));

// Import images
requireAll(require.context('./images', true, /\.(png|jpg|jpeg|gif)$/));
