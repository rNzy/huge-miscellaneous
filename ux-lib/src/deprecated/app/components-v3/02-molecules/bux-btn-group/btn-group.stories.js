import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import md from './btn-group.documentation.md';
import './btn-group.component';

storiesOf('V2/Molecules/Button group', module)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
    <bux2-btn-group>
      <bux-btn></bux-btn>
      <bux-btn>Annuler</bux-btn>
      <bux-btn disabled>Désactiver</bux-btn>
    </bux2-btn-group>
      `
  );
