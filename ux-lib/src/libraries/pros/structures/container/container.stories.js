import './container.component.js';

export default {
  title: 'Components|Container',
  component: 'ux-container',
  includeStories: ['']
};

export const baseContainer = () => `
<ux-container type="base">
  Lorem ipsum dolores claiborne
</ux-container>
`;

export const spaceAroundContainer = () => `
<ux-container type="space-around">
  Lorem ipsum dolores claiborne
</ux-container>
`;
