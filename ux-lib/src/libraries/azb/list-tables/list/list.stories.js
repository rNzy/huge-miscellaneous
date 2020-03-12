import './list.component.js';

// Declare customElements

export default {
  title: 'Components|Listes - tables/List',
  component: 'ux-list',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const simpleList = () => `
<ux-list>
  <ux-text lib-size="sm">List item 1</ux-text>
  <ux-text lib-size="sm">List item 2</ux-text>
  <ux-text lib-size="sm">List item 3</ux-text>
  <ux-text lib-size="sm">List item 4</ux-text>
  <ux-text lib-size="sm">List item 5</ux-text>
</ux-list>
`;

export const bulletList = () => `
<ux-list bullet>
  <ux-text lib-size="sm">List item 1</ux-text>
  <ux-text lib-size="sm">List item 2</ux-text>
  <ux-text lib-size="sm">List item 3</ux-text>
  <ux-text lib-size="sm">List item 4</ux-text>
  <ux-text lib-size="sm">List item 5</ux-text>
</ux-list>
`;
