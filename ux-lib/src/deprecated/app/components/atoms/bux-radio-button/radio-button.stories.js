import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import './radio-button.component';
import md from './radio-button.documentation.md';

storiesOf('Atoms/Input/Radio button', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-radio-button
        data-label="${text('data-label', 'Je suis un label')}"
        data-value="${text('data-value', 'value')}"
        data-name="${text('data-name', 'inputname')}"
        >
      </bux-radio-button>
      `;
  });
