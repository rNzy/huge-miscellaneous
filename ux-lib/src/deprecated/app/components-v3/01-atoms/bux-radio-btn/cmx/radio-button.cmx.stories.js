import centered from '@storybook/addon-centered/html';

import './radio-button.component';
import './radio-group.component';

export default {
  title: 'Components|Atoms/RadioButtons',
  decorators: [centered]
};

export const utilisation = () => `
<fieldset>
<legend>Beverages:</legend>
<bux2-radio-group id="radios" space-v="sm">
  <bux2-radio-button>Water</bux2-radio-button>
  <bux2-radio-button>Soda</bux2-radio-button>
  <bux2-radio-button>Coffee</bux2-radio-button>
</bux2-radio-group>
</fieldset>
`;

export const standAlone = () => `
<bux2-radio-button>Water</bux2-radio-button>
`;

export const group = () => `
<fieldset>
<legend>Beverages:</legend>
<bux2-radio-group id="radios" space-v="sm">
  <bux2-radio-button>Water</bux2-radio-button>
  <bux2-radio-button>Soda</bux2-radio-button>
  <bux2-radio-button>Coffee</bux2-radio-button>
</bux2-radio-group>
</fieldset>
`;
