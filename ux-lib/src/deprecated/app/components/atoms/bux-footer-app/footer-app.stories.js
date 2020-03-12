import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/polymer';

import './footer-app.component.js';
import md from './footer-app.documentation.md';

storiesOf('Atoms/footer-app', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
          <bux-footer-app>
          Texte
          </bux-footer-app>
        `
  );
