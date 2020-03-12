import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import './skip-nav.component.js';
import md from './skip-nav.documentation.md';

storiesOf('Molecules/Skip-nav', module)
  .addDecorator(withReadme(md))
  .add('default', () => '<bux-skip-nav></bux-skip-nav>');
