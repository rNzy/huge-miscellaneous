import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import './footer.component';
import md from './footer.documentation.md';

storiesOf('Molecules/Footer', module)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = '<bux-footer id="footer"></bux-footer>';

    const footer = tpl.content.querySelector('#footer');

    const promises = [];
    promises.push(window.customElements.whenDefined('bux-nav-bar'));
    promises.push(window.customElements.whenDefined('bux-nav-bar-item'));

    Promise.all(promises).then(() => {
      footer.data = [
        {
          path: '/',
          label: 'Accessibilité'
        },
        {
          path: '/',
          label: 'Mentions légales'
        },
        {
          path: '/',
          label: 'Infos consommateurs'
        },
        {
          path: '/',
          label: 'Données personnelles'
        },
        {
          path: '/',
          label: 'Tarification des services'
        },
        {
          path: '/',
          label: 'Condition générales de banque'
        },
        {
          label: '© Arkéa'
        }
      ];
    });
    return tpl.content;
  });
