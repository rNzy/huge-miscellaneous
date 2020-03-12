import centered from '@storybook/addon-centered/html';

import './btn.component';
import '../../../02-molecules/bux-btn-group/cmx/btn-group.component';

export default {
  title: 'Components|Atoms/Buttons',
  decorators: [centered]
};

export const allButtons = () => `
<bux2-btn-group>
  <bux2-btn type="primary">Primary</bux2-btn>
  <bux2-btn type="secondary">Secondary</bux2-btn>
  <bux2-btn type="primary" disabled>Disabled</bux2-btn>
</bux2-btn-group>
`;

export const primaryButton = () => `
<bux2-btn type="primary">Primary</bux2-btn>
`;

export const secondaryButton = () => `
<bux2-btn type="secondary">Secondary</bux2-btn>
`;

export const disabledButton = () => `
<bux2-btn type="primary" disabled>Disabled</bux2-btn>
`;
