import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  text,
  boolean,
  number,
  select
} from '@storybook/addon-knobs/polymer';

import { withReadme } from 'storybook-readme';

import md from './header.documentation.md';
import './header.component';

storiesOf('Molecules/Header', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => `
  <bux-header
  type="${select(
    'type',
    ['default', 'empty', 'public', 'pseudoauth'],
    'default'
  )}"
  data-gender="${text('data-gender', 'M.')}"
  data-first-name="${text('data-first-name', 'Henri')}"
  data-last-name="${text('data-last-name', 'MARTIN')}"
  data-last-connection="${text(
    'data-last-connection',
    'Dernière connexion le 22/01/2019 à 19h24'
  )}"
  data-espace="${text('data-espace', 'ESPACE PARTICULIERS')}"
  data-message="${number('data-message', 5)}"
  data-label="${text('data-espace', 'Titre portable')}"
  data-connected="${boolean('data-connected', false)}"
  data-link-connect="${text('data-link-connect', '/auth/login')}"
  data-link-unconnect="${text('data-link-unconnect', '/logout/')}"
>
</bux-header>`
  );
