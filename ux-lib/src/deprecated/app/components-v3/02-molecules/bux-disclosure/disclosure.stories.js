import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './disclosure.documentation.md';
import './disclosure.component';

storiesOf('V2/Molecules/Disclosure', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'Disclosure closed',
    () =>
      `
      <bux2-disclosure label="Disclosure title closed">
        <bux2-text slot="content" tag="p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
        </bux2-text>
      </bux2-disclosure>
      `
  )
  .add(
    'Disclosure open',
    () => `
      <bux2-disclosure
        label="Disclosure title open"
        label-expanded="Disclosure title 2 open"
        expanded
      >
        <bux2-text slot="content" tag="p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
        </bux2-text>
      </bux2-disclosure>
      `
  )
  .add(
    'Disclosure with icon',
    () => `
    <bux2-disclosure label="Disclosure title with icon">
      <bux2-svg icon="help" size="md" slot="icon-right"></bux2-svg>
      <bux2-text slot="content" tag="p">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
      </bux2-text>
    </bux2-disclosure>
    `
  );
