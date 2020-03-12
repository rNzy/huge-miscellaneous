import './link-tile.component.js';

export default {
  title: 'Components|Interactions/Link Tile',
  component: 'ux-link-tile',
  includeStories: ['']
};

export const linkTile = () => `
<ux-link-tile addshadow lib-bg-color="primary" lib-link="#">Je suis une tuile avec un lien.</ux-link-tile>
`;
