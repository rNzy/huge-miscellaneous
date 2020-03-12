import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import './shortcut.component.js';
import md from './shortcut.documentation.md';

storiesOf('Molecules/shortcut', module)
  .addDecorator(withReadme(md))
  .add(
    'default',
    () => {
      const tpl = document.createElement('template');
      tpl.innerHTML = '<bux-shortcut id="shortcut"></bux-shortcut>';

      const shortcut = tpl.content.querySelector('#shortcut');

      window.customElements.whenDefined('bux-shortcut').then(() => {
        shortcut.data = [
          {
            label: 'Comptes',
            icon: 'cheque-carte',
            path: '/comptes/'
          },
          {
            label: 'Épargne',
            icon: 'montant',
            path: '/epargne/'
          },
          {
            label: 'Virement',
            icon: 'virements',
            path: '/virement/'
          },
          {
            label: 'Virtualis',
            icon: 'virtualis',
            path: '/virtualis/'
          },
          {
            label: 'Cartes',
            icon: 'cartes',
            path: '/carte/'
          }
        ];
      });

      return tpl.content;
    }
  );
