import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './heading.documentation.md';
import './heading.component';

storiesOf('V2/Molecules/Heading', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
    Titre en Haut de page
    <bux2-heading level="1" style-level="0">Digiposte</bux2-heading>
    
    Titre avec Icone à gauche
    <bux2-heading level="2" label="Digiposte" tabindex="0">
      <bux2-svg slot="left" icon="pret-reglemente"></bux2-svg>
      <span>Mes derniers relevés</span>
    </bux2-heading>
    
    Titre avec Icone à gauche et à droite
    <bux2-heading level="2" tabindex="0">
      <bux2-svg slot="left" icon="shield"></bux2-svg>
      <span>Digiposte</span>
      <bux2-svg slot="right" icon="help"></bux2-svg>
    </bux2-heading>
      `
  );
