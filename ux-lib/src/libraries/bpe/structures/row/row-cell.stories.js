import './row-cell.component.js';

export default {
  title: 'Components|RowCell',
  component: 'ux-row-cell',
  includeStories: ['']
};

export const simple = () => `
<ux-grid columns="1-1-1-1">
  <ux-row-cell slot="1" align-x="start">
    <strong>Je suis aligné vers le haut !</strong>
  </ux-row-cell>
  <ux-row-cell slot="2" align-x="end">
    <strong>Je suis aligné vers le bas !</strong>
    </ux-row-cell>
  <ux-row-cell slot="3" align-x="center">
    <strong>Je suis aligné au centre !</strong>
  </ux-row-cell>
  <ux-row-cell slot="4">
    <strong>Ceci est un texte !</strong>
    <small>Et ceci un sous-texte !</small>
    <em>Et ceci un sous-sous-texte !</em>
    <code>Et ceci un code !</code>
  </ux-row-cell>
</ux-grid>
`;

export const complexe = () => `
<ux-grid columns="1-1-1-1">
  <ux-row-cell slot="1" align-x="between">
    <strong>Nous sommes totalement...</strong>
    <em>séparés l'un de l'autre !</em>
  </ux-row-cell>
  <ux-row-cell slot="2" align-x="evenly">
  <strong>Nous avons un espace égal</strong>
  <em>tout autour de nous !</em>
    </ux-row-cell>
  <ux-row-cell slot="3" align-x="around">
  <strong>Nous avons un espace commun nous entourant</strong>
  <em>et le reste de l'espace entre nous</em>
  </ux-row-cell>
  <ux-row-cell slot="4">
    <strong>Ceci est un texte !</strong>
    <small>Et ceci un sous-texte !</small>
    <em>Et ceci un sous-sous-texte !</em>
    <code>Et ceci un code !</code>
  </ux-row-cell>
</ux-grid>
`;
