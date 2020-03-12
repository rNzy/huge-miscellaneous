import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './table.component.js';
import md from './table.documentation.md';

storiesOf('Atoms/Table', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-table
        data-label-header="${text(
          'data-label-header',
          'Mon texte dans le header'
        )}"
        data-title-footer="${text(
          'data-title-footer',
          'Mon texte dans le footer'
        )}"
        data-label-footer="${text(
          'data-label-footer',
          'Mon texte dans le footer'
        )}"
        data-link-footer="${text(
          'data-link-footer',
          'Mon lien dans le footer'
        )}"
        >
        <bux-row
          data-date="18/11/17"
          data-label="AMAZON PAYMENT"
          data-sublabel="N° 12345555"
          data-amount="-352.50">
        </bux-row>
        <bux-row
          data-date="18/11/17"
          data-label="AMAZON PAYMENT"
          data-sublabel="N° 12345555"
          data-amount="-352.50">
        </bux-row>
        <bux-row
          data-date="18/11/17"
          data-label="AMAZON PAYMENT"
          data-sublabel="N° 12345555"
          data-amount="-352.50">
        </bux-row>
      </bux-table>`;
    return tpl.content;
  });
