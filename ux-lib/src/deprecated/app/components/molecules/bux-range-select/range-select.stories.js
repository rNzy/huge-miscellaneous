import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './range-select.component';
import md from './range-select.documentation.md';

storiesOf('Molecules/Input/Range Select', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-range-select
        state="${select('state', ['empty', 'valid', 'error'])}"
        required="${boolean('required', false)}"
        data-select-label="${text('data-select-label', 'Durée')}"
        data-select-label-right="${text('data-select-label-right', 'mois')}"
        data-select-width="${number('data-select-width', 100)}"
        data-range-label-left="${text('data-range-label-left', '3mois')}"
        data-range-label-right="${text('data-range-label-right', '18mois')}"
        data-value-min="${number('data-value-min', 3)}"
        data-value-max="${number('data-value-max', 18)}"
        data-step="${number('data-step', 1)}"
        >
      </bux-range-select>`;
    return tpl.content;
  });
