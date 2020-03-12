import { storiesOf } from '@storybook/polymer';

import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import './svg.component';
import md from './svg.documentation.md';

storiesOf('Atoms/Icon', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-svg data-icon="${text('data-icon', 'help')}" data-class="${text(
      'data-class',
      'myclass'
    )}"></bux-svg>
      `
  )
  .add('all', () => {
    let tpl = `
    <table>
      <thead>
          <tr>
              <td>Name</td>
              <td>Icon</td>
          </tr>
      </thead>
      <tbody>
    `;

    const svg = document.getElementById('uxlibsvg');

    [...svg.children[0].children].forEach(icon => {
      tpl += `
        <tr>
          <td>${icon.id}</td>
          <td style="font-size:35px;"><bux-svg data-icon="${icon.id}"></bux-svg></td>
        </tr>
      `;
    });

    tpl += '</tbody></table>';

    return tpl;
  });
