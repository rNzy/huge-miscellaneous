import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';

import './row-icon.component.js';
import md from './row-icon.documentation.md';

storiesOf('Atoms/Row-icon', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux-row-icon
            data-label="${text('data-value', 'Nom et prénom :')}"
            data-value="${text('data-label', 'Marcel Bidon')}"
            data-icon="${text('data-icon', 'group')}"
            >
          </bux-row-icon>
        `
  );
