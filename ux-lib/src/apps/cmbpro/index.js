// Export global var for efs
window.uxEfs = 'cmso';

// Deprecated components and css
import './../../deprecated/assets/scss-v2/main_cmbpro.scss';
import './../../deprecated/cmx.pro.import';

import { requireAll } from '../../../build-utils/utils';

// Import Icons
requireAll(require.context('./icons', true, /\.svg$/));

// Import images
requireAll(require.context('./images', true, /\.(png|jpg|jpeg|gif)$/));

// import css
// import './../../core/styles/core.style.css';
// import './css/settings.css';
