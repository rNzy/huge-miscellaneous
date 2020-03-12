import {
  storiesOf
} from '@storybook/polymer';
import {
  withKnobs,
  number,
  text,
  boolean,
  select
} from '@storybook/addon-knobs/polymer';
import {
  withReadme
} from 'storybook-readme';

import md from './amount.documentation.md';
import './amount.component';

storiesOf('Atoms/Amount', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux-amount
          data-value=${number('data-amount', 100)}
          data-currency=${text('data-currency', 'EUR')}
          data-period=${text('data-period', 'mois') || ''}
          size="${select('size', ['sm', 'md', 'xl', 'xxl', 'inherit'], 'md')}"
          currency-size="${select(
            'currency-size',
            ['sm', 'md', 'xl', 'xxl'],
            'md'
          )}"
          period-size="${select(
            'period-size',
            ['sm', 'md', 'xl', 'xxl'],
            'md'
          )}"
          bold="${boolean('bold', false)}"
          align-top="${boolean('align-top', false)}"
        >
        </bux-amount>
      `
  )
  .add(
    'negative',
    () => `
        <bux-amount
          data-value=${number('data-amount', -100)}
          data-currency=${text('data-currency', '€')}
          data-period=${text('data-period', 'mois')}
          size="${select('size', ['sm', 'md', 'xl'], 'md')}"
          currency-size="${select(
            'currency-size',
            ['sm', 'md', 'xl', 'xxl'],
            'md'
          )}"
          period-size="${select(
            'period-size',
            ['sm', 'md', 'xl', 'xxl'],
            'md'
          )}"
          bold="${boolean('bold', false)}"
          align-top="${boolean('align-top', false)}"
        >
        </bux-amount>
      `
  );
