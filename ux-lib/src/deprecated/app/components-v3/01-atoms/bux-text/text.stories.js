import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './text.documentation.md';
import './text.component';

storiesOf('V2/Atoms/Text', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux2-text
          tag="${text('tag', '')}"
          background="${boolean('background', false)}"
          background-light="${boolean('background-light', false)}"
          bold="${boolean('bold', false)}"
          uppercase="${boolean('uppercase', false)}"
          center="${boolean('center', false)}"
          size="${select('size', ['xs', 'sm', 'md'], 'md')}">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste sapiente tenetur dolores atque quis optio odio quia nostrum praesentium mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus doloribus?
        </bux2-text>
      `
  );
