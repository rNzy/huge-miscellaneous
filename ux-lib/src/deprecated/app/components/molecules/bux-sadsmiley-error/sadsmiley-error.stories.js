import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './sadsmiley-error.documentation.md';
import './sadsmiley-error.component';

storiesOf('V2/Molecules/sadsmiley-error', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <sadsmiley-error>
          ${text(
            `contenu 1`,
            `La calculatrice est temporairement indisponible.
            Merci de réessayer ultérieurement.`
          )}
      </sadsmiley-error>`
  );
