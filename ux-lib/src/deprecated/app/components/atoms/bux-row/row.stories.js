import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './row.component';
import md from './row.documentation.md';

storiesOf('Atoms/Row/Row table', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
        <bux-row
          radio="${boolean('radio', false)}"
          data-date="${text('data-date', '18/11/17')}"
          data-label="${text('data-label', 'AMAZON PAYMENT')}"
          data-sublabel="${text('data-sublabel', 'N° 12345555')}"
          data-amount="${text('data-amount', '-352.50')}"
          a11y-label="${text('a11y-label', 'voir le détail')}"
        >
        </bux-row>
      `;
  })
  .add('row as a link', () => {
    return `
        <bux-row
          data-date="${text('data-date', '18/11/17')}"
          data-label="${text('data-label', 'AMAZON PAYMENT')}"
          data-sublabel="${text('data-subLabel', 'N° 12345555')}"
          data-amount="${text('data-amount', '-352.50')}"
          data-link="${text('data-link', '/insert/route/here')}"
          a11y-label="${text('a11y-label', 'voir le détail')}"
          noborderbottom="${boolean('noborderbottom', true)}"
        >
        </bux-row>
      `;
  })
  .add('row as a fake link', () => {
    return `
        <bux-row
          data-date="${text('data-date', '18/11/17')}"
          data-label="${text('data-label', 'AMAZON PAYMENT')}"
          data-sublabel="${text('data-subLabel', 'N° 12345555')}"
          data-amount="${text('data-amount', '-352.50')}"
          a11y-label="${text('a11y-label', 'voir le détail')}"
          noborderbottom="${boolean('noborderbottom', true)}"
          link
        >
        </bux-row>
      `;
  });
