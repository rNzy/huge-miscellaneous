import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './loader.component.js';
import md from './loader.documentation.md';

storiesOf('Atoms/loader', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
    <bux-loader loading></bux-loader>
    `
  );
