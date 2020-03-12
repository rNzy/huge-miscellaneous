import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './layout-flex.documentation.md';
import './layout-flex.component';

storiesOf('V2/Atoms/Input/Label', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
  <bux2-layout-flex>
    <bux-account-tile
    data-account-model="simple"
    data-account-label="Total de mon épargne"
    data-account-amount="10342.90" data-account-currency="EUR">
    </bux-account-tile>
    <bux-account-tile
    data-account-model="simple-link"
    data-account-label="Mes procurations, enfants, tutelles"
    data-account-link-url="detail-epargne.html">
    </bux-account-tile>
  </bux2-layout-flex>
      `
  );
