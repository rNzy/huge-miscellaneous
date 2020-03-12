import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import {
  withKnobs,
  text,
  select,
  boolean,
  number
} from '@storybook/addon-knobs/polymer';

import './bulle-item.component.js';
import md from './bulle-item.documentation.md';

storiesOf('V2/Molecules/Bulle-item', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux2-bulle-item
            select="${select('select', ['nodata', 'valid', 'error'])}"
            boolean="${boolean('required', false)}"
            text="${text('text', 'Mon texte')}"
            number="${number('number', 100)}"
          >
          </bux2-bulle-item>
        `
  );
