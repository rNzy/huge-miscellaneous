import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs/polymer';

import './sitemap.component.js';
import md from './sitemap.documentation.md';

storiesOf('Pages/Sitemap', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
        `
          <bux-sitemap
            select="${select('select', ['nodata', 'valid', 'error'])}"
            boolean="${boolean('required', false)}"
            text="${text('text', 'Mon texte')}"
            number="${number('number', 100)}"
          >
          </bux-sitemap>
        `
    );
