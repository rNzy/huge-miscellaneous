import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import md from './list.documentation.md';
import './list.component';

storiesOf('V2/Molecules/List', module)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux2-list>
        <bux2-text>listitem 1</bux2-text>
        <bux2-text>listitem 2</bux2-text>
        <bux2-text>listitem 3</bux2-text>
        <bux2-text>listitem 4</bux2-text>
        <bux2-text>listitem 5</bux2-text>
      </bux2-list>
      `
  );
