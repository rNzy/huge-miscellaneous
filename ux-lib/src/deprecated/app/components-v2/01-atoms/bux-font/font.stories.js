import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './font.documentation.md';
import './font.component';

storiesOf('Atoms/font', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux2-font
        data-size="${select('size', ['xs', 'sm', 'md', 'lg', 'xl'])}"
        bold="${boolean('bold', false)}"
        italic="${boolean('italic', false)}"
        underline="${boolean('underline', false)}"
        uppercase="${boolean('uppercase', false)}"
        data-color="${select('color', [
          'part',
          'pro',
          '#0519EF',
          '#CC5500',
          '#ccc'
        ])}"
        >
          ${text('label', 'Je suis un simple texte (inline!)')}
      </bux2-font>`
  );
