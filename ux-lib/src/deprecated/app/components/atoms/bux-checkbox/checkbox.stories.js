import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import './checkbox.component';
import md from './checkbox.documentation.md';

storiesOf('Atoms/Input/Checkbox', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-checkbox
      data-label="${text('data-label', 'check label')}"
      data-value="${text('data-value', 'value')}"
      data-name="${text('data-name', 'testname')}"
      >
      </bux-checkbox>
      `;
  })
  .add('checked', () => {
    return `
      <bux-checkbox
        data-label="${text('checklabel', 'check label')}"
        data-value="${text('checkvalue', 'correspond à la value/id/for')}"
        checked>
      </bux-checkbox>
      `;
  })
  .add('Card style', () => {
    return `
      <bux-checkbox
        type="cardstyle"
        data-label="${text('data-label', 'check label')}"
        data-sublabel="${text('data-sublabel', 'check sublabel')}"
        data-value="${text('data-value', 'value')}">
      </bux-checkbox>
      `;
  });
