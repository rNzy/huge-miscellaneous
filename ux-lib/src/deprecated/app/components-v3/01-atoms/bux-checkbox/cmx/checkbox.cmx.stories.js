import centered from '@storybook/addon-centered/html';

import './checkbox.component';
import './checkbox-group.component';

import '../../bux-label/label.component';

export default {
  title: 'Components|Atoms/Checkbox',
  decorators: [centered]
};

export const utilisation = () => `
<bux2-checkbox id="foo"></bux2-checkbox>
<bux2-label for="foo">Click Me I'm the label</bux2-label>
`;

export const unchecked = () => `
<bux2-checkbox></bux2-checkbox>
`;

export const checked = () => `
<bux2-checkbox checked></bux2-checkbox>
`;

export const disabled = () => `
<bux2-checkbox checked disabled></bux2-checkbox>
`;

export const group = () => `
<bux2-checkbox-group>
  <bux2-text slot="group-label" theme="part">Groupe de checkbox</bux2-text>
  <bux2-checkbox id="foo"></bux2-checkbox>
  <bux2-label for="foo">Unchecked</bux2-label>
  <bux2-checkbox id="bar" checked></bux2-checkbox>
  <bux2-label for="bar">Checked</bux2-label>
  <bux2-checkbox id="baz" disabled></bux2-checkbox>
  <bux2-label for="baz">Disabled</bux2-label>
</bux2-checkbox-group>
`;
