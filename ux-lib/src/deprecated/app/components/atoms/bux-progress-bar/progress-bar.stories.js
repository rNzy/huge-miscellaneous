import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  number,
  boolean,
  select,
  color
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './progress-bar.documentation.md';
import './progress-bar.component';

const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

storiesOf('Atoms/Progress/Progress bar', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'simple progress bar',
    () =>
      `
        <bux-progress-bar
          data-value="${number('data-value', 38, percentageRange)}" 
          data-height="${number('data-height', 20)}"
          hidevalues="${boolean('hidevalues', false)}"
          nomargin="${boolean('nomargin', false)}"
          hidemobile="${boolean('hidemobile', false)}"
          data-primary-color="${color('data-primary-color', '', '')}"
          data-secondary-color="${color('data-secondary-color', '', '')}"
          size="${select('size', ['xs', 'md'], 'md')}"
          >
        </bux-progress-bar>
      `
  )
  .add(
    'double progress bar',
    () => `
        <bux-progress-bar
          data-value-primary="${number(
            'data-value-primary',
            20,
            percentageRange
          )}"
          data-value-secondary="${number(
            'data-value-secondary',
            43,
            percentageRange
          )}" 
          data-height="${number('height', 20)}"
          hidevalues="${boolean('hidevalues', false)}"
          nomargin="${boolean('nomargin', false)}"
          hidemobile="${boolean('hidemobile', false)}"
          >
        </bux-progress-bar>
      `
  )
  .add(
    'Couleur et label',
    () => `
    <bux-progress-bar
      data-value="10"
      hidevalues
      size="xs"
      state="error"
      data-label="Niveau de sécurité : <strong class='bux-colored'>Excellent</strong>"
    ></bux-progress-bar>`
  );
