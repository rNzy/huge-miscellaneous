import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './accordion.documentation.md';
import './accordion.component';

storiesOf('V2/Molecules/Accordion', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'Accordion',
    () =>
      `
    <bux2-accordion>
      <bux2-accordion-item>
        <bux2-text slot="header" tag="h2">accordion title 1</bux2-text>
        <bux2-text slot="content" tag="p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
        </bux2-text>
      </bux2-accordion-item>
      <bux2-accordion-item expanded>
        <bux2-text slot="header" tag="h2">accordion title 2</bux2-text>
        <bux2-text slot="content" tag="p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
        </bux2-text>
      </bux2-accordion-item>
      <bux2-accordion-item>
        <bux2-text slot="header" tag="h2">accordion title 3</bux2-text>
        <bux2-text slot="content" tag="p">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
        </bux2-text>
      </bux2-accordion-item>
    </bux2-accordion>
      `
  );
