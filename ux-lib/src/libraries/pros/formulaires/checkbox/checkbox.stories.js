import './checkbox.component.js';
import './checkbox-group.component.js';

export default {
  title: 'Components|Formulaires/Checkbox',
  component: 'ux-checkbox',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const utilisation = () => `
<ux-checkbox id="foo"></ux-checkbox>
<ux-label for="foo">Click Me I'm the label</ux-label>
`;

export const unchecked = () => `
<ux-checkbox></ux-checkbox>
`;

export const checked = () => `
<ux-checkbox checked></ux-checkbox>
`;

export const disabled = () => `
<ux-checkbox checked disabled></ux-checkbox>
`;

export const group = () => `
<ux-checkbox-group space-v="sm">
  <ux-text slot="group-label" theme="part">Groupe de checkbox</ux-text>
  <div>
    <ux-checkbox id="foo"></ux-checkbox>
    <ux-label for="foo">Unchecked</ux-label>
  </div>
  <div>
    <ux-checkbox id="bar" checked></ux-checkbox>
    <ux-label for="bar">Checked</ux-label>
  </div>
  <div>
    <ux-checkbox id="baz" disabled></ux-checkbox>
    <ux-label for="baz">Disabled</ux-label>
  </div>
</ux-checkbox-group>
`;
