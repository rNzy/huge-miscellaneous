import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';
import './accordeon.component.js';
import md from './accordeon.documentation.md';

storiesOf('Molecules/Accordeon', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-accordeon>
        <bux-accordeon-item data-label="${text(
          'data-label 1',
          'Ma Section 1'
        )}"
        data-icon="${text(
          'data-icon 1',
          'pen'
        )}"
        >${text('Contenu 1', 'Mon Contenu 1')}</bux-accordeon-item>
        <bux-accordeon-item data-label="${text(
          'data-label 2',
          'Ma Section 2'
        )}">${text('Contenu 2', 'Mon Contenu 2')}</bux-accordeon-item>
      </bux-accordeon>
      `;
  });
