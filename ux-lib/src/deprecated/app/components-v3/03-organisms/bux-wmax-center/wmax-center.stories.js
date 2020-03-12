import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/polymer';

import './wmax-center.component.js';
import md from './wmax-center.documentation.md';

storiesOf('V2/Organisms/Wmax-center', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux2-wmax-center>Salut tout le monde</bux2-wmax-center>
        `
  );
