import centered from '@storybook/addon-centered/html';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import './card.component';
import './card-header.component';
import './card-body.component';
import './card-footer.component';

import '../../../01-atoms/bux-text/text.component';

export default {
  title: 'Components|Molecules/Card',
  decorators: [centered, withKnobs],
  includeStories: ['simpleCard', 'noBorder'], // or simply don't load this file at all
  parameters: {
    componentSubtitle: 'Handy status label'
  }
};

export const simpleCard = () =>
  `<bux2-card>
    <bux2-card-header>
      <bux2-text theme="part">Title inside card-header</bux2-text>
    </bux2-card-header>
    <bux2-card-body>Hello World inside the body</bux2-card-body>
    <bux2-card-footer>Card footer</bux2-card-footer>
  </bux2-card>
  `;
simpleCard.story = {
  name: 'default'
};

const noborder = boolean('noborder', true);

export const noBorder = () =>
  `<bux2-card ${noborder ? noborder : ''}>
    <bux2-card-header>Card Title & noshadow</bux2-card-header>
    <bux2-card-body>Hello World inside the body</bux2-card-body>
    <bux2-card-footer>Card footer</bux2-card-footer>
  </bux2-card>
  `;
noBorder.story = {
  name: 'using noborder'
};
