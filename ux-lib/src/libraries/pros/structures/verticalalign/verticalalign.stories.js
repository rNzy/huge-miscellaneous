import './verticalalign.component.js';

export default {
  title: 'Components|VerticalAlign',
  component: 'ux-verticalalign',
  includeStories: ['']
};

export const simple = () => `
<ux-verticalalign>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-verticalalign>
`;

export const complexe = () => `
<ux-grid columns="3-1">
  <ux-verticalalign slot="1">
    <div>
      <strong>Ceci est un texte !</strong>
      <small>Et ceci un sous-texte !</small>
    </div>
    <div>
      <strong>Ceci est un texte !</strong></<strong>
      <small>Et ceci un sous-texte !</small></<small>
    </div>
    <div>
      <strong>Ceci est un texte !</strong></<strong>
      <small>Et ceci un sous-texte !</small></<small>
    </div>
  </ux-verticalalign>
  <ux-verticalalign slot="2">
    <div>
    <ux-amount value="25005154.50" lib-size="lg" round>primary</ux-amount>
      <ux-text>Échéance</ux-text>
    </div>
  </ux-verticalalign>
</ux-grid>


`;
