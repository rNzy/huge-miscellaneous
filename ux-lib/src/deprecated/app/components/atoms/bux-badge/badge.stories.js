import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './badge.documentation.md';
import './badge.component';

storiesOf('Atoms/Badge', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-badge>
        ${text('label', '9 mois')}
      </bux-badge>
      `
  )
  .add(
    'large',
    () => `
      <bux-badge large>
        ${text('label', '9 mois')}
      </bux-badge>
      `
  );
