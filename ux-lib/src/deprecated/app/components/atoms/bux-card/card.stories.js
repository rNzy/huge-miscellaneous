import { storiesOf } from '@storybook/polymer';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import './card.component.js';
import md from './card.documentation.md';
import { withReadme } from 'storybook-readme';

storiesOf('Atoms/Card', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-card>
        <bux-card-header>${text('Header', 'Je un titre')}</bux-card-header>
        <bux-card-body layout="${select(
          'layout',
          ['default', 'grid-hero', 'columns-medium'],
          'default'
        )}">
          ${text('Content', 'Je suis un body')}
        </bux-card-body>
        <bux-card-footer>${text('Footer', 'Je un footer')}</bux-card-footer>
      </bux-card>
      `
  );
