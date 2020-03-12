import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, number } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './progress-reserve.component';
import md from './progress-reserve.documentation.md';

storiesOf('Molecules/Progress Reserve', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-progress-reserve
        data-value="${number('data-value', 15)}"
        data-label="${text('data-label', 'je suis un label')}"
        data-amount="${number('data-amount', 550)}"
        a11y-label="${text(
          'a11y-label',
          'je suis un label servant à la vocalisation'
        )}">
      </bux-progress-reserve>
      `;
  });
