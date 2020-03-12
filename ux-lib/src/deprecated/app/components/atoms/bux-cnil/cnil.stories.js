import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';

import './cnil.component.js';
import md from './cnil.documentation.md';

storiesOf('Atoms/Cnil', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    document.cookie = 'trackingAccepted=; Max-Age=-99999999;';
    return `
          <bux-cnil
          data-content="${text('data-content', '')}"
          >
          </bux-cnil>
        `;
  });
