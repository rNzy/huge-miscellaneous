import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/polymer';

import './key-value-item.component.js';
import md from './key-value-item.documentation.md';

storiesOf('V2/Molecules/Key-value-item', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
      <bux2-key-value>
      <bux2-key-value-item
        ><div slot="key">Civilité</div>
        <div slot="value">Monsieur</div></bux2-key-value-item
      >
      <bux2-key-value-item level="2"
        ><div slot="key">Nom</div>
        <div slot="value">Spéciment</div></bux2-key-value-item
      >
      <bux2-key-value-item level="2"
        ><div slot="key">Prénom</div>
        <div slot="value">Jean</div></bux2-key-value-item
      >
    </bux2-key-value>
        `
  );
