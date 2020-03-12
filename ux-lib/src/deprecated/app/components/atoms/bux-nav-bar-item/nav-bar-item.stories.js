import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import './nav-bar-item.component';
import md from './nav-bar-item.documentation.md';

storiesOf('Atoms/Nav Bar item', module)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-elastic-nav>
        <bux-bar-item
          label="linko uno"
          path="#uno">
        </bux-bar-item>
        <bux-bar-item
          label="linko due"
          path="#due">
        </bux-bar-item
        <bux-bar-item
          label="linko tre tre linko wawa"
          path="#tre">
        </bux-bar-item>
      </bux-elastic-nav>
      `;
  });
