import './date.component.js';

export default {
  title: 'Components|Typography/Date',
  component: 'ux-date',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const date = () => `
<div>
  <ux-date value="31-12-9999"></ux-date>
</div>
`;

export const dateInvalidFormat = () => `
<div>
  <ux-date value="310-12-9999"></ux-date>
</div>
`;

export const dateInvalidValue = () => `
<div>
  <ux-date value="32-12-9999"></ux-date>
</div>
`;
