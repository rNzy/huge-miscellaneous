import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, number } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './image.documentation.md';
import './image.component';

storiesOf('V2/Atoms/Image', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux2-image
          src="${text('src', 'logo.png')}"
          alt="${text('alt', 'Je suis un logo')}"
          height="${number('height', 25)}"
          width="${number('width', 25)}"
        >
        </bux2-image>
      `
  );
