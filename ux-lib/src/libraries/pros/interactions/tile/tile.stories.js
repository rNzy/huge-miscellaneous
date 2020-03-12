import './tile.component.js';

export default {
  title: 'Components|Interactions/Tile',
  component: 'ux-tile',
  includeStories: ['']
};

export const tilePrimary = () => `
<ux-tile lib-bg-color="primary">Je suis une tuile à fond rouge sans ombre.</ux-tile>
`;

export const tileSecondary = () => `
<ux-tile addshadow lib-bg-color="secondary">Je suis une tuile à fond gris avec une ombre.</ux-tile>
`;

export const tileTertiary = () => `
<ux-tile addshadow lib-bg-color="tertiary">Je suis une tuile à fond gris clair avec une ombre.</ux-tile>
`;

export const tileImage = () => `
<ux-tile addshaddow bg-img="src/libraries/cmx/interactions/tile/foobar.jpg">Je suis une truile avec une image de fond.</ux-tile>
`;
