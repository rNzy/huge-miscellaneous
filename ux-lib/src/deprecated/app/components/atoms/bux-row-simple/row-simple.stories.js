import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import './row-simple.component';
import md from './row-simple.documentation.md';

storiesOf('Atoms/Row/Row simple', module)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux-row-simple>
          <bux-text>Du texte à gauche</bux-text>
          <bux-text size="xl">Du texte à droite</bux-text>
        </bux-row-simple>
        <bux-row-simple>
          <bux-text>Avec un montant à droite</bux-text>
          <bux-amount data-value="-250" bold></bux-amount>
        </bux-row-simple>
      `
  )
  .add(
    'small',
    () => `
        <bux-row-simple type="small">
          <bux-text>Du texte à gauche</bux-text>
          <bux-text size="xl">Du texte à droite</bux-text>
        </bux-row-simple>
      `
  )
  .add(
    'background',
    () => `
        <bux-row-simple type="background">
          <bux-text>Opérations à venir</bux-text>
          <bux-amount data-value="-250" bold></bux-amount>
        </bux-row-simple>
      `
  );
