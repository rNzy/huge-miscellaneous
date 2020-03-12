import { storiesOf } from '@storybook/polymer';
import { withKnobs, select } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './list.component.js';
import md from './list.documentation.md';

storiesOf('Atoms/List', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
    <bux-list 
    type="${select('type', ['nostyle', 'disc', 'circle', 'square'], 'text')}"
    >
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </bux-list>
    `
  );
