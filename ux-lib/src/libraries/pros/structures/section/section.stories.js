import './section.component.js';

export default {
  title: 'Components|Structures/section',
  component: 'ux-section',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const section = () => `
<ux-section space-v="lg">
  <ux-text tag="p" lib-size="sm">List item 1</ux-text>
  <ux-text lib-size="sm">List item 2</ux-text>
  <ux-text lib-size="sm">List item 3</ux-text>
  <ux-text lib-size="sm">List item 4</ux-text>
  <ux-text lib-size="sm">List item 5</ux-text>
</ux-section>
`;
