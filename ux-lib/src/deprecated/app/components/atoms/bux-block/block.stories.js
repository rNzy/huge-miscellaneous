import {
  storiesOf
} from '@storybook/polymer';
import {
  withKnobs,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';
import {
  withReadme
} from 'storybook-readme';

import './block.component.js';
import md from './block.documentation.md';

storiesOf('Atoms/Block', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-block
        layout="${select('layout', ['nopadding', 'small', 'medium', 'large'])}"
        noshadow="${boolean('noshadow', false)}"
        nomarginbottom="${boolean('nomarginbottom', false)}"
        center="${boolean('center', false)}"
        wmax480="${boolean('wmax480', false)}"
        nopaddingbottom="${boolean('nopaddingbottom', false)}"
        nobackground="${boolean('nobackground', false)}"
        >
        <div>Voici un block</block>
      </bux-block>`
  );
