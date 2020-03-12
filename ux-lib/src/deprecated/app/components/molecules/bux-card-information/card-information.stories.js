import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import md from './card-information.documentation.md';
import './card-information.component';

storiesOf('Molecules/Card Information', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux-card-information
          data-label="${text('data-label', 'Compte chèque 1')}"
          data-holder="${text('data-holder', 'Jean SPECIMENT')}"
          data-number="${text('data-number', 'XXXX656484')}"
          data-image-path="${text('data-image-path', '/road/to/wawa/image')}"
        >
        </bux-card-information>
      `
  );
