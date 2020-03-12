import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs, select } from '@storybook/addon-knobs/polymer';

import './bulle-block.component.js';
import md from './bulle-block.documentation.md';

storiesOf('Atoms/Bulle-block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux-bulle-block
          arrow-position="${select('arrow-position', [
            '1of2',
            '2of2',
            '1of3',
            '2of3',
            '3of3',
            '1of4',
            '2of4',
            '3of4',
            '4of4'
          ])}"          >
          Some text
          </bux-bulle-block>
        `
  );
