import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import {
  withKnobs,
  text
} from '@storybook/addon-knobs/polymer';

import './back-link.component.js';
import md from './back-link.documentation.md';

storiesOf('Atoms/Back-link', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
      <bux-back-link
      data-label="${text('data-label', 'Mes comptes')}"
      data-link="${text('data-link', '/comptes')}"
      >
      </bux-back-link>
        `
  );
