import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, select } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './text.documentation.md';
import './text.component';

storiesOf('Atoms/text', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-text
        size="${select('size', ['sm', 'md', 'xl'])}">
          ${text('label', 'Je suis un simple texte')}
      </bux-text>`
  )
  .add(
    'bold text',
    () => `
      <bux-text
        size="${select('size', ['sm', 'md', 'xl'])}"
        bold>
          ${text('label', 'Je suis un simple texte')}
      </bux-text>`
  );
