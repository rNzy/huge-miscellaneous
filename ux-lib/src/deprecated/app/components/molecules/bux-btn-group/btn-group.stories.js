import { storiesOf } from '@storybook/polymer';

import { withKnobs, boolean } from '@storybook/addon-knobs/polymer';

import { withReadme } from 'storybook-readme';
import './btn-group.component';
import md from './btn-group.documentation.md';

storiesOf('Molecules/Button/Button Group', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
        <bux-btn-group
          nomarginbottom="${boolean('nomarginbottom', false)}">
          <bux-btn onClick="alert('Click')">Annuler</bux-btn>
          <bux-btn disabled>Désactiver</bux-btn>
        </bux-btn-group>
      `;
  });
