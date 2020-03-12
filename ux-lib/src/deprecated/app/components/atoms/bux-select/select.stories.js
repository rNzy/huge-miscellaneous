import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './select.component';
import md from './select.documentation.md';

storiesOf('Atoms/Input/Select', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-select
        layout="${select('layout', ['default', 'align'], 'default')}"
        state="${select('state', ['empty', 'valid', 'error'], 'empty')}"
        required="${boolean('required', false)}"
        data-label="${text('data-label', "Durée de l'étalement")}"
        data-label-right="${text('data-label-right', 'mois')}"
        data-select-width="${text('data-select-width', '100')}"
        data-error-msg="${text(
          'data-error-msg',
          'La valeur minimale est de 50 €'
        )}"
        >
          <option disabled selected>sélectionner une option</option>
          <option>1</option>
          <option>Option avec un trèèèèssssssssssssssssssssssssssssssssssssssssssssssss grand label</option>

      </bux-select>`;
    return tpl.content;
  });
