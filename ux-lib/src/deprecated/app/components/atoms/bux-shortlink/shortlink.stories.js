import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import md from './shortlink.documentation.md';
import './shortlink.component';

storiesOf('Atoms/Shortlink', module)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
        <bux-shortlink>
        </bux-shortlink>
      `
  );
