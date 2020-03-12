import { init, requireAll } from '../../../../.storybook/preview.default.js';
import { setCustomElements } from '@storybook/web-components';
import customElements from './custom-elements.json';

// Import svg for icons
requireAll(require.context('../icons', true, /\.svg$/));

// charge le json custom-elements
setCustomElements(customElements);

// charge les stories de la librairie utilisée (ie: novicom, allianz, bpe)
const req = require.context(
  '../../../libraries/azb',
  true,
  /\.stories\.(js|mdx)$/
);

// Initialise la lib
init({
  req
});

require('../css/settings.css');
