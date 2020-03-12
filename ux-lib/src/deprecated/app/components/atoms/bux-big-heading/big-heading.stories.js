import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/polymer';

import './big-heading.component.js';
import md from './big-heading.documentation.md';

storiesOf('Atoms/Big-heading', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux-big-heading
          center="${boolean('center', false)}"
          data-label=${text('data-label', 'Gros titre')}
          >
          </bux-big-heading>
        `
  );
