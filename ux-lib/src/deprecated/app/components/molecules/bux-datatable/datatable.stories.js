import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import './datatable.component';
import './../bux-datatable-row/datatable-row.component';
import './../bux-datatable-head/datatable-head.component';
import md from './datatable.documentation.md';

storiesOf('Molecules/Datatable', module)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-datatable data-caption="caption this table thing">
        <bux-datatable-head>
          <div>Date</div> <div>Heure</div>
          <div>Support de connexion</div>
        </bux-datatable-head>

        <bux-datatable-row>
          <div>21/02/2019</div> <div>20h34</div>
          <div>Application - iPhone</div>
        </bux-datatable-row>

        <bux-datatable-row>
          <div>21/02/2019</div> <div>20h34</div>
          <div>Application - iPhone</div>
        </bux-datatable-row>
        <bux-datatable-row>
          <div>21/02/2019 </div> <div>20h34</div>
          <div>Application - iPhone</div>
        </bux-datatable-row>
      </bux-datatable>
      `
  );
