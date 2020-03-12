import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './accordion-item.documentation.md';
import './accordion-item.component';

storiesOf('V2/Molecules/Accordion item', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'Accordion closed',
    () =>
      `
    <bux2-accordion-item>
      <bux2-text slot="header" tag="h2">accordion title 2</bux2-text>
      <bux2-text slot="content" tag="p">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
      </bux2-text>
    </bux2-accordion-item>
      `
  )
  .add(
    'Accordion open & extra slot',
    () => `
    <bux2-accordion-item expanded>
      <bux2-text slot="header" tag="h2">accordion title 2</bux2-text>
      <bux2-text slot="extra" tag="span">extra slot</bux2-text>
      <bux2-text slot="content" tag="p">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis?
      </bux2-text>
    </bux2-accordion-item>
      `
  );
