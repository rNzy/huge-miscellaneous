import './button.component.js';
import './button-group.component.js';

export default {
  title: 'Components|Formulaires/Buttons',
  component: 'ux-btn',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const allButtons = () => `
<ux-btn model="primary">primary</ux-btn>
<ux-btn model="secondary">secondary</ux-btn>
<ux-btn model="primary" disabled>disabled</ux-btn>
`;

/**
 * primary button
 */
export const primary = () => `
<ux-btn model="primary">primary</ux-btn>
`;

export const secondary = () => `
<ux-btn model="secondary">secondary</ux-btn>
`;

export const disabled = () => `
<ux-btn model="primary" disabled>disabled</ux-btn>
`;

export const buttonGroup = () => `
<ux-btn-group>
  <ux-btn model="secondary">secondary</ux-btn>
  <ux-btn model="primary">primary</ux-btn>
</ux-btn-group>
`;

export const buttonGroupVertical = () => `
<ux-btn-group vertical>
  <ux-btn model="secondary">secondary</ux-btn>
  <ux-btn model="primary">primary</ux-btn>
</ux-btn-group>
`;
