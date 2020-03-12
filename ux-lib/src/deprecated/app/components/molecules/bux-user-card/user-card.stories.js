import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import md from './user-card.documentation.md';
import './user-card.component';

storiesOf('Molecules/User Card', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'profil',
    () => `
        <bux-user-card
          data-label="${text('data-label', 'User Name')}"
          data-sublabel="${text('data-sublabel', 'underline text')}"
          profil
        >
        </bux-user-card>
      `
  );
