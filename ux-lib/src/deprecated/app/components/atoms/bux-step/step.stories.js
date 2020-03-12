import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import {
  withKnobs,
  text,
  select,
  number
} from '@storybook/addon-knobs/polymer';

import './step.component.js';
import md from './step.documentation.md';

storiesOf('Atoms/Step', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux-step
            data-state="${select(
              'data-state',
              ['current', 'valid', 'upcoming'],
              'current'
            )}"
            data-label="${text('data-label', 'Mon texte')}"
            data-number="${number('data-number', 1)}"
          >
          </bux-step>
        `
  );
