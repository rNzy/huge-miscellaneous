import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './widget.documentation.md';
import './widget.component';

storiesOf('Molecules/Widget', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux-widget
          data-label="${text('data-label', 'Compte chèque 1')}"
        >
        </bux-widget>
      `
  );
