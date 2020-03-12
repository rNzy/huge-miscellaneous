import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';
import { withKnobs } from '@storybook/addon-knobs/polymer';

import './link-tile.component.js';
import md from './link-tile.documentation.md';

storiesOf('Atoms/Link-tile', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () =>
      `
        <bux-link-tile
          data-label="C'est un label"
          data-link="/route/to/wawaland">
        </bux-link-tile>

        <bux-link-tile
          data-label="C'est un title"
          data-sublabel="C'est un subtitle"
          data-link="/route/to/wawaland"
          colored>
        </bux-link-tile>

        <bux-link-tile
          data-label="C'est un title"
          data-sublabel="C'est un subtitle"
          data-badges="<bux-badge large>Dernier prélèvement le <strong>23/08/2018</strong></bux-badge>"
          data-link="/route/to/wawaland"
          colored>
        </bux-link-tile>

        <bux-link-tile
          data-label="Une icone et font-weight: bold"
          data-icon="maison-2"
          data-link="/route/to/wawaland"
          bold>
        </bux-link-tile>

        <bux-link-tile
          data-label="Avec un box shadow"
          data-icon="maison-2"
          data-link="/route/to/wawaland"
          shadow>
        </bux-link-tile>

        <bux-link-tile
          data-label="Avec un title et un aria-label"
          data-link="/route/to/wawaland"
          data-title="Voir nos offres d'épargne long terme"
          a11y-label="Cliquez pour afficher, dans un nouvel onglet, nos offres de produits d'épargne long terme"
          shadow>
        </bux-link-tile>
      `
  );
