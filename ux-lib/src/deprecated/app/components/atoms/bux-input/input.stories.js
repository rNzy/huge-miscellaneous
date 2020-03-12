import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './input.component.js';
import md from './input.documentation.md';

storiesOf('Atoms/Input/Input', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-input
        layout="${select('layout', ['default', 'align'], 'default')}"
        state="${select('state', ['empty', 'valid', 'error'], 'error')}"
        type="${select(
          'type',
          [
            'button',
            'checkbox',
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week'
          ],
          'text'
        )}"
        data-placeholder="${text('data-placeholder', 'placeholder')}"
        required="${boolean('required', false)}"
        data-autocomplete="${text('data-autocomplete', '')}"
        data-label="${text('data-label', 'Montant')}"
        data-label-right="${text('data-label-right', '€')}"
        data-input-width="${number('data-input-width', 150)}"
        data-error-msg="${text(
          'data-error-msg',
          'La valeur minimale est de 50 €'
        )}"
        a11y-step-in="${boolean('a11y-step-in', false)}"
        a11y-step-out="${boolean('a11y-step-out', false)}"
      >
      </bux-input>`;
    return tpl.content;
  })
  .add('number/date', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-input
        state="${select('state', ['empty', 'valid', 'error'], 'error')}"
        type="${select('type', ['number', 'date'], 'number')}"
        data-label="${text('data-label', 'Montant')}"
        data-value-min="${number(
          'data-min (pour une date le format est YYYY-MM-DD)',
          50
        )}"
        data-value-max="${number(
          'data-max (pour une date le format est YYYY-MM-DD)',
          100
        )}"
        data-step="${number('data-step', 1)}"
        a11y-step-in="${boolean('a11y-step-in', false)}"
        a11y-step-out="${boolean('a11y-step-out', false)}"
      >
      </bux-input>`;
    return tpl.content;
  })
  .add(
    'autocomplete',
    () =>
      `
        <bux-input
        data-list="sitemapdatalist"
        data-placeholder="Recherche une fonctionnalité"
        id="sitemapinput"
      ></bux-input>
      <datalist id="sitemapdatalist">
        <option value="test1"></option>
        <option value="test2"></option>
        <option value="test3"></option>
      </datalist>
  `
  );
