import './amount.component.js';

export default {
  title: 'Components|Typography/Amount',
  component: 'ux-amount',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const amount = () => `
<ux-amount value="250" lib-size="md">primary</ux-amount>
`;

export const amountNegative = () => `
<ux-amount value="-250" lib-size="lg">primary</ux-amount>
`;

export const amountWithBackground = () => `
<ux-amount value="25005154.50" lib-size="lg" background-base>primary</ux-amount>
`;

export const amountRound = () => `
<ux-amount value="25005154.50" lib-size="lg" round>primary</ux-amount>
`;
