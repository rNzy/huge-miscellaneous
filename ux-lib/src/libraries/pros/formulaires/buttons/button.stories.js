import './button.component.js';

export default {
  title: 'Components|Buttons',
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
