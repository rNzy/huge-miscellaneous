import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  number,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './amount.documentation.md';
import './amount.component';

storiesOf('V2/Atoms/Amount', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux2-amount
          value="${number('value', 100)}"
          currency="${text('currency', 'EUR')}"
          tag="${text('tag', '')}"
          background="${boolean('background', false)}"
          background-light="${boolean('background-light', false)}"
          bold="${boolean('bold', false)}"
          center="${boolean('center', false)}"
          size="${select('size', ['xs', 'sm', 'md'], 'md')}"
          suffix="${text('suffix', '')}"
        >
        </bux2-amount>
      `
  )
  .add(
    'round',
    () => `
        <bux2-amount
          value="${number('value', 100)}"
          currency="${text('currency', 'EUR')}"
          round="${boolean('round', true)}"
          tag="${text('tag', '')}"
          background="${boolean('background', false)}"
          background-light="${boolean('background-light', false)}"
          bold="${boolean('bold', false)}"
          center="${boolean('center', false)}"
          size="${select('size', ['xs', 'sm', 'md'], 'md')}"
          suffix="${text('suffix', '')}"
        >
        </bux2-amount>
      `
  )
  .add(
    'suffix',
    () => `
        <bux2-amount
          value="${number('value', 100)}"
          currency="${text('currency', 'EUR')}"
          round="${boolean('round', true)}"
          tag="${text('tag', '')}"
          background="${boolean('background', false)}"
          background-light="${boolean('background-light', false)}"
          bold="${boolean('bold', false)}"
          center="${boolean('center', false)}"
          size="${select('size', ['xs', 'sm', 'md'], 'md')}"
          suffix="${text('suffix', ' / mois')}"
        >
        </bux2-amount>
      `
  )
  .add(
    'min-fraction-digits',
    () => `
        <bux2-amount
          value="${number('value', 100)}"
          currency="${text('currency', 'EUR')}"
          min-fraction-digits="${number('min-fraction-digits', 0)}"
          tag="${text('tag', '')}"
          background="${boolean('background', false)}"
          background-light="${boolean('background-light', false)}"
          bold="${boolean('bold', false)}"
          center="${boolean('center', false)}"
          size="${select('size', ['xs', 'sm', 'md'], 'md')}"
          suffix="${text('suffix', '')}"
        >
        </bux2-amount>
      `
  )
  .add(
    'min-fraction-digits',
    () => `
        <bux2-amount
          value="${number('value', 100)}"
          currency="${text('currency', 'EUR')}"
          max-fraction-digits="${number('max-fraction-digits', 2)}"
          tag="${text('tag', '')}"
          background="${boolean('background', false)}"
          background-light="${boolean('background-light', false)}"
          bold="${boolean('bold', false)}"
          center="${boolean('center', false)}"
          size="${select('size', ['xs', 'sm', 'md'], 'md')}"
          suffix="${text('suffix', '')}"
        >
        </bux2-amount>
      `
  );
