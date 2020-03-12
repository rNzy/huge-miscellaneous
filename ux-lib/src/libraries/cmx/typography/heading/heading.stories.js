import './heading.component.js';

export default {
  title: 'Components|Heading',
  component: 'ux-heading',
  includeStories: ['']
};

export const simple = () => `
<ux-heading tag="h2">
Libellés sur comptes
</ux-heading>
`;

export const button = () => `
<ux-heading tag="h2">
Libellés sur comptes
  <ux-btn slot="right" model="primary">Press me</ux-btn>
</ux-heading>
`;
