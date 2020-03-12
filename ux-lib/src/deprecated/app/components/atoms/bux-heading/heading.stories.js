import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './heading.component';
import md from './heading.documentation.md';

storiesOf('Atoms/Heading', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-heading
        data-level="${select('data-level', ['1', '2', '3'], '2')}"
        data-icon="${text('data-icon', '')}"
        data-identifier="${text('data-identifier', '')}"
        type="${select('type', ['default', 'dropdown'], 'default')}"
        a11y-expanded="${boolean('a11y-expanded', false)}">
        ${text('Contenu', 'Je suis un titre')}
      </bux-heading>
      `;
  })
  .add('with toast', () => {
    return `
      <bux-heading
        data-level="2"
        data-icon="${text('data-icon', 'conseiller')}"
        data-identifier="${text('data-identifier', 'id4ToastFocusBack')}"
        type="default"
        data-toast="${text('data-toast', 'modalId')}">
        ${text('Contenu', 'Je suis un titre avec infobulle')}
      </bux-heading>
      <bux-modal id="modalId"></bux-modal>
      `;
  });
