import {
  storiesOf
} from '@storybook/polymer';
import {
  withKnobs,
  text,
  boolean
} from '@storybook/addon-knobs/polymer';
import {
  withReadme
} from 'storybook-readme';

import './file-download.component';
import md from './file-download.documentation.md';

storiesOf('Molecules/File operations/File Download', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
      <bux-file-download
        data-label="${text('data-label', 'mes données personnelles')}"
        data-sublabel="${text('data-sublabel', 'à télécharger')}"
        data-path="${text('data-path', '/mon/path')}"
        data-filename="${text('data-filename', 'monfilename')}"
        data-filesize="${text('data-filesize', '10mo')}"
        data-filelang="${text('data-filelang', 'Français')}"
        data-filetype="${text('data-filetype', 'pdf')}"
        a11y-label="${text(
      'a11y-label',
      'Télécharger vos données personnelles'
    )}"
    horizontal="${boolean('horizontal', false)}"
    nomarginbottom="${boolean('nomarginbottom', false)}"

    >
      </bux-file-download>
      `;
    return tpl.content;
  });
