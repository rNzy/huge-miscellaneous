import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  number,
  text,
  boolean,
  select
} from '@storybook/addon-knobs/polymer';

import './big-input.component';
import md from './big-input.documentation.md';
import { withReadme } from 'storybook-readme';

storiesOf('Atoms/Input/Big input', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-big-input 
      data-value="${number('data-value', '')}"
        state="${select('state', ['empty', 'valid', 'error'])}"
        required="${boolean('required', false)}"
        data-currency="${text('data-currency', '€')}"
        data-label="${text('data-label', '')}"
        data-error-msg="${text('data-error-msg', '')}">
      </bux-big-input>`;

    return tpl.content;
  })
  .add('with label', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-big-input 
      data-value="${number('data-value', '')}"
        state="${select('state', ['empty', 'valid', 'error'])}"
        required="${boolean('required', false)}"
        data-currency="${text('data-currency', '')}"
        data-label="${text('data-label', 'Je suis un label')}"
        data-error-msg="${text('data-error-msg', '')}">
      </bux-big-input>`;

    return tpl.content;
  })
  .add(
    'with label and required',
    () => `
      <bux-big-input required="true" data-label="Je suis un label">
      </bux-big-input>`
  )
  .add(
    'valid',
    () => `
      <bux-big-input data-value="" state="valid" required="false" data-currency="€" data-label="Je suis un label" data-error-msg="">
      </bux-big-input>`
  )
  .add(
    'error',
    () => `
      <bux-big-input data-value="" state="error" required="false" data-currency="€" data-label="Je suis un label" data-error-msg="Je suis une erreur">
      </bux-big-input>`
  );
