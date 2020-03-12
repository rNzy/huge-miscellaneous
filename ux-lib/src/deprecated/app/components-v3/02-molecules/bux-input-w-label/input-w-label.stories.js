import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './input-w-label.documentation.md';
import './input-w-label.component';

storiesOf('V2/Atoms/Input/Input-w-label', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux2-input-w-label>
        <bux2-label slot="label-top">
          Mon label <bux-svg data-icon="help" />
        </bux2-label>
        <bux2-label slot="label-left">Montant</bux2-label>
        <bux2-input>
          <bux-svg slot="icon-left" data-icon="help"></bux-svg>
          <bux-svg slot="icon-right" data-icon="help"></bux-svg>
        </bux2-input>
        <bux2-label slot="label-right">€</bux2-label>
        <bux2-label slot="label-bottom">label en dessous</bux2-label>
      </bux2-input-w-label>
      `;
  });
