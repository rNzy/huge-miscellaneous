import { storiesOf } from '@storybook/polymer';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import './container.component';
import md from './container.documentation.md';

storiesOf('Atoms/Container', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => {
      return `
      <bux-container
        type="${select('type', ['block', 'dropdown'])}">
        <p>${text('Contenu', 'Je suis un texte')}</p>
      </bux-container>
      `;
    }
  );
