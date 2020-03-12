import { storiesOf } from '@storybook/polymer';
import { withKnobs, number } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './progressBar.documentation.md';
import './progressBar.component';

const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

storiesOf('V2/Atoms/Progress bar', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'simple progress bar',
    () =>
      `
        <bux2-progressbar
          value="${number('data-value', 38, percentageRange)}">
        </bux2-progressbar>
      `
  )
  .add(
    'double progress bar',
    () => `
        <bux2-progressbar
          value-primary="${number('data-value-primary', 20, percentageRange)}"
          value-secondary="${number(
            'data-value-secondary',
            43,
            percentageRange
          )}"
          >
        </bux2-progressbar>
      `
  );
