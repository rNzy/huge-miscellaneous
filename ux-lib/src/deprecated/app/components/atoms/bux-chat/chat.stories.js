import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs';

import './chat.component.js';
import md from './chat.documentation.md';
import { withReadme } from 'storybook-readme';

storiesOf('Atoms/Chat', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
      <bux-chat
        data-date="${text('data-date', 'Mercredi 25 Avril 2048')}">
        <p>
          Bonjour M. MARTIN
        </p>
        <p>
          <strong>Votre nouveau chéquier est à votre disposition</strong> dans votre caisse de *Marque*.
        </p>
        <p>
          <strong>Votre adresse e-mail n'est pas renseignée,</strong>  merci de nous l'indiquer via <a href="">le formulaire de votre profil client</a>.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor enim dolore error! Sint, molestiae. Doloribus possimus ullam eligendi voluptates, totam quae neque voluptatum eveniet! Provident vel at voluptates hic placeat.
        </p>
      </bux-chat>
      `
  );
