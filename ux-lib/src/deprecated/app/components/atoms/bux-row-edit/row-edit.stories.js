import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  boolean,
  number
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './row-edit.component';
import md from './row-edit.documentation.md';

storiesOf('Atoms/Row/row Edit', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux-row-edit
          data-label-left="${text('data-label-left', 'Protection Carte')}"
          data-label-right="${text('data-label-right', 'Activée')}"
          editable="${boolean('editable', 'button')}"
          data-help="${boolean('help', false)}"
        >
      </bux-row-edit>
      <bux-row-edit
          data-label-left="${text('data-label-left', 'Protection Carte')}"
          data-label-right="${text('data-label-right', 'Activée')}"
          editable="${boolean('editable', 'link')}"
          data-help="${boolean('help', false)}"
        >
      </bux-row-edit>`
  )
  .add(
    'Avec un montant',
    () => `
        <bux-row-edit
          data-label-left="${text('data-label-left', 'Protection Carte')}"
          data-amount="${number('data-amount', '256')}"
          editable="${boolean('editable', false)}"
          data-help="${boolean('data-help', false)}"
        >
      </bux-row-edit>`
  )
  .add('Edit And Help', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-row-edit
        data-label-left="${text('data-label-left', 'Protection Carte')}"
        data-label-right="${text('data-label-right', 'Activée')}"
        editable="${boolean('editable', true)}"
        data-help="${boolean('data-help', true)}"
        >
      </bux-row-edit>`;

    tpl.content.querySelector('bux-row-edit').addEventListener('help', () => {
      alert('help');
    });

    tpl.content.querySelector('bux-row-edit').addEventListener('edit', () => {
      alert('edit');
    });
    return tpl.content;
  });
