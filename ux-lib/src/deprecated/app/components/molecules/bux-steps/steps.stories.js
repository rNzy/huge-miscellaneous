import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/polymer';

import './steps.component.js';
import md from './steps.documentation.md';

storiesOf('Molecules/Steps', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux-steps
            
          </bux-steps>
        `
  );
