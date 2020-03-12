import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './label.documentation.md';
import './label.component';

storiesOf('V2/Atoms/Input/Label', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux2-label>Je suis un label</bux2-label>
      `
  );
