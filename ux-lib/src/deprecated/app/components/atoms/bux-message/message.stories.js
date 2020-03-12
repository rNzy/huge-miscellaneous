import { storiesOf } from '@storybook/polymer';
import { withKnobs, select } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './message.documentation.md';
import './message.component';

storiesOf('Atoms/Message box', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
    <bux-message type="${select(
      'type',
      ['warning', 'error', 'info', 'alert'],
      'info'
    )}">
      <p>Message 1</p>
      <p>Test</p>
    </bux-message>`
  );
