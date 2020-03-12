import { storiesOf } from '@storybook/polymer';
import { withKnobs, number, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './range.documentation.md';

import './range.component';

const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

const percentageRange2 = {
  range: true,
  min: 0,
  max: 15000,
  step: 1
};

storiesOf('Atoms/Input/Range', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux-range 
          data-value="${number('data-value', 50, percentageRange)}"
          data-value-min="${number('data-value-min', 0)}"
          data-value-max="${number('data-value-max', 100)}"
          data-step="${number('data-step', 1)}"
          data-label-left="${text('data-label-left', '0 mois')}"
          data-label-right="${text('data-label-right', '100 mois')}"
        </bux-range>
    `
  )
  .add(
    'dashed',
    () => `
        <bux-range 
          data-value="${number('data-value', 50, percentageRange2)}"
          data-value-min="${number('data-value-min', 0)}"
          data-value-max="${number('data-value-max', 15000)}"
          data-step="${number('data-step', 1)}"
          data-label-left="${text('data-label-left', '0 €')}"
          data-label-right="${text('data-label-right', '15 000 €')}"
          data-label-middle="${text('data-label-middle', '9 000 €')}"
          data-label-middle-position="${text(
            'data-label-middle-position',
            '60%'
          )}"
          data-dash-position="${text('data-dash-position', '60%')}"
        </bux-range>
    `
  );
