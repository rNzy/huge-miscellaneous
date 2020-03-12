import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './input.documentation.md';
import './input.component';

storiesOf('V2/Atoms/Input/Input', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const slotIconLeft = boolean('slot-icon-left', false);
    const slotIconRight = boolean('slot-icon-right', false);

    return `
        <bux2-input
        state="${select('state', ['empty', 'valid', 'error'], 'empty')}"
        type="${select(
          'type',
          [
            'button',
            'checkbox',
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'radio',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week'
          ],
          'text'
        )}"
        required="${boolean('required', false)}"
        >
        ${
          slotIconLeft
            ? `<bux-svg slot="icon-left" data-icon="help"></bux-svg>`
            : ''
        }
        ${
          slotIconRight
            ? `<bux-svg slot="icon-right" data-icon="help"></bux-svg>`
            : ''
        }
        </bux2-input>
      `;
  });
