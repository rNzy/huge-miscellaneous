import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';

import { withReadme } from 'storybook-readme';

import './account-info.component';
import md from './account-info.documentation.md';

storiesOf('Molecules/Account information', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-account-info
        account-label="COMPTE CHEQUES 2"
        account-holder="${text('accountHolder', 'JEAN SPECIMEN')}"
        account-coholder="${text('accountCoHolder', 'JEANNE SPECIMEN')}">
      </bux-account-info>
      `;
  });
