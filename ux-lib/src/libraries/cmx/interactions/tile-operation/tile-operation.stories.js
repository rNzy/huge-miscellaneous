import './tile-operation.component.js';

export default {
  title: 'Components|Interactions/Tile-Operation',
  component: 'ux-tile-operation',
  includeStories: ['']
};

export const tileOperation = () => `
<ux-tile-operation>
  <ux-row-cell slot="1">
    <ux-date value="08-10-2019" lib-size="md" bold></ux-date>
    <ux-text lib-size="sm">Expire fin 02/20</ux-text>
  </ux-row-cell>
  <ux-row-cell slot="2">
    <span>FD VERSEMENT BOULOGNE BILLANCOU 92100FR</span>
  </ux-row-cell>
  <ux-row-cell slot="3" align-x="right">
    <ux-amount value="250.55" lib-size="md" bold></ux-amount>
    <span>Montant restant</span>
  </ux-row-cell>
</ux-tile-operation>
`;
