import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import './checkbox-group.component';
import md from './checkbox-group.documentation.md';

storiesOf('Molecules/Input/Checkbox group', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-checkbox-group
        data-name="${text('data-name', 'name utilisé par les checkbox')}"
        a11y-label="${text(
          'a11y-label',
          'text non visible destiné aux screen readers'
        )}"
        a11y-step-in="${boolean('a11y-step-in', false)}"
        a11y-step-out="${boolean('a11y-step-out', false)}"
        hide-button="${boolean('hide-button', false)}"

        layout="2-columns-md">

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 3">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 4">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 5">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 6">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 7">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 8">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 9">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 10">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 11">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 12">
        </bux-checkbox>

      </bux-checkbox-group>
      `;
  })
  .add('layout: 4-columns-md', () => {
    return `
      <bux-checkbox-group
        data-name="wawacheckboxwawa"
        a11y-label="accessible legend checkbox"
        layout="4-columns-md">

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 3">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 4">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 5">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 6">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 7">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 8">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 9">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 10">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-value="data-value 11">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-value="data-value 12">
        </bux-checkbox>

      </bux-checkbox-group>
      `;
  })
  .add('layout: 2-columns-md', () => {
    return `
      <bux-checkbox-group
        data-name="wawacheckboxwawa"
        a11y-label="accessible legend checkbox"
        layout="2-columns-md">

        <bux-checkbox
          data-label="data-label 1"
          data-sublabel="checksublabel 1"
          data-value="data-value 3"
          type="cardstyle">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 2"
          data-sublabel="checksublabel 2"
          data-value="data-value 4"
          type="cardstyle">
        </bux-checkbox>

        <bux-checkbox
          data-label="data-label 1"
          data-sublabel="checksublabel 1"
          data-value="data-value 5"
          type="cardstyle">
        </bux-checkbox>



      </bux-checkbox-group>
      `;
  });
