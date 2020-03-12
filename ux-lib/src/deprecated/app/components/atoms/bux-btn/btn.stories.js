import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';

import './btn.component';
import md from './btn.documentation.md';
import { withReadme } from 'storybook-readme';

storiesOf('Atoms/Input/Button', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-btn
        type="${select('type', ['primary', 'secondary', 'svg'], 'primary')}"
        disabled="${boolean('disabled', false)}"
        a11y-label="${text('a11y-label', 'Ok')}"
        data-role="${select(
          'data-role',
          ['button', 'link', 'link-external'],
          'button'
        )}"
        data-identifier="${text('data-identifier', 'myid')}"
        data-icon="${text('data-icon', 'check')}"
        outlined="${boolean('outlined', false)}"
        data-link="${text('data-link', 'lien du boutton')}"
        >
        ${text('label', 'Ok')}
      </bux-btn>`
  );
