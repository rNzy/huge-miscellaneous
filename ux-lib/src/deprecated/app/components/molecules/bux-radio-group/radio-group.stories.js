import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import './radio-group.component';
import md from './radio-group.documentation.md';

storiesOf('Molecules/Input/Radio group', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('type: list', () => {
    return `
      <bux-radio-group
        data-name="${text('data-name', 'wawawa')}"
        a11y-label="${text(
          'accessible-legend',
          'text non visible destiné aux screen readers'
        )}"
        a11y-step-in="${boolean('a11y-step-in', false)}"
        a11y-step-out="${boolean('a11y-step-out', false)}"
        no-margin-bottom="${boolean('no-margin-bottom', false)}"
        >

        <bux-radio-button
          data-label="radio label 1"
          data-value="radio value 1">
        </bux-radio-button>

        <bux-radio-button
          data-label="radio label 2"
          data-value="radio value 2">
        </bux-radio-button>

        <bux-radio-button
          data-label="radio label 3"
          data-value="radio value 3">
        </bux-radio-button>

      </bux-radio-group>
      `;
  })
  .add('type: row', () => {
    return `
      <bux-radio-group
        data-name="${text('radio-name', 'wawawa')}"
        a11y-label="${text(
          'accessible-legend',
          'text non visible destiné aux screen readers'
        )}"
        a11y-step-in="${boolean('a11y-step-in', false)}"
        a11y-step-out="${boolean('a11y-step-out', false)}"
        no-margin-bottom="${boolean('no-margin-bottom', false)}"
        type="row">

        <bux-radio-button
          data-label="radio label 1"
          data-value="radio value 1">
        </bux-radio-button>

        <bux-radio-button
          data-label="radio label 2"
          data-value="radio value 2">
        </bux-radio-button>

        <bux-radio-button
          data-label="radio label 3"
          data-value="radio value 3">
        </bux-radio-button>

      </bux-radio-group>
      `;
  });
