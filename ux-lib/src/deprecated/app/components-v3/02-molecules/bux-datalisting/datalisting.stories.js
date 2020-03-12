import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './datalisting.documentation.md';
import './datalisting.component.js';
import './datalisting-head.component.js';
import './datalisting-row.component.js';

storiesOf('V2/Molecules/Table', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'Datalisting',
    () =>
      `
      <bux2-datalisting caption="Liste des opérations comptabilisées">
      <!-- HEAD -->
      <bux2-datalisting-head>
        <bux2-text left>Date de l'opération</bux2-text>
        <bux2-text>Libellé</bux2-text>
        <bux2-text right>Montant</bux2-text>
      </bux2-datalisting-head>
      <!-- ROWS -->
      <bux2-datalisting-row>
        <bux2-text bold left>12/03/2019</bux2-text>
        <bux2-text>Lorem ipsum dolor sit amet consectetur adipisicing elit</bux2-text>
        <bux2-amount value="3200" right></bux2-amount>
      </bux2-datalisting-row>
      <bux2-datalisting-row>
        <bux2-text bold>12/03/2018</bux2-text>
        <bux2-text>Obcaecati amet aliquid autem nemo illo</bux2-text>
        <bux2-amount value="3200" right></bux2-amount>
      </bux2-datalisting-row>
      <bux2-datalisting-row>
        <bux2-text bold>14/03/2018</bux2-text>
        <bux2-text>Aliquam voluptas suscipit in praesentium</bux2-text>
        <bux2-amount value="50.00" right></bux2-amount>
      </bux2-datalisting-row>
    </bux2-datalisting>
      `
  );
