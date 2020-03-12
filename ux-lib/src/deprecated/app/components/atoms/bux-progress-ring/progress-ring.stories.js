import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, number } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './progress-ring.documentation.md';
import './progress-ring.component';

const percentageRange = {
  range: true,
  min: 0,
  max: 100,
  step: 1
};

storiesOf('Atoms/Progress/Progress ring', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
        <bux-progress-ring
          data-value="${number('data-value', 50, percentageRange)}"
          a11y-label="${text(
            'a11y-label',
            'Texte de vocalisation pour accessibilité'
          )}"
        >
        </bux-progress-ring>

        <bux-progress-ring
          data-value="25">
          <bux-text>25 %</bux-text>
        </bux-progress-ring>

        <bux-progress-ring
          data-value="25">
          <bux-svg
            data-icon="m-mobilite"
            data-class="c-progress-ring__icon">
          </bux-svg>
        </bux-progress-ring>

        <bux-progress-ring loading></bux-progress-ring>
      `;
  });
