import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './dualpanel.documentation.md';
import './dualpanel.component';

storiesOf('V2/Molecules/dualpanel', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux2-dualpanel>
        <div slot="panel01">
          ${text(
            'contenu 1',
            'Disrupt raclette affogato knausgaard williamsburg flannel cliche retro farm-to-table keffiyeh flexitarian. Prism meggings keytar, snackwave fashion axe ugh pour-over. Chartreuse prism tumeric, plaid cold-pressed selfies letterpress marfa selvage slow-carb iPhone put a bird on it. Pug craft beer kale chips kickstarter blue bottle quinoa +1.'
          )}
        </div>
        <div slot="panel02">
          ${text(
            'contenu 2',
            'Selvage fixie before they sold out ethical biodiesel. Umami VHS flannel vexillologist keffiyeh, thundercats pinterest slow-carb af succulents leggings vegan deep v. Jean shorts narwhal kickstarter ethical man braid edison bulb. Cold-pressed waistcoat keffiyeh post-ironic, palo santo mlkshk quinoa farm-to-table glossier pinterest poke chartreuse small batch selvage.'
          )}
        </div>
      </bux2-dualpanel>`
  );
