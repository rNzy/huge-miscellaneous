import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './nav-bar.documentation.md';
import './nav-bar.component';

storiesOf('Molecules/Nav Bar', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('primary', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = '<bux-nav-bar id="nav" type="primary"></bux-nav-bar>';

    const nav = tpl.content.querySelector('#nav');

    const promises = [];
    promises.push(window.customElements.whenDefined('bux-nav-bar'));
    promises.push(window.customElements.whenDefined('bux-nav-bar-item'));

    Promise.all(promises).then(() => {
      // Lui fournir les datas pour qu'il s'affiche
      nav.data = [
        {
          path: '#',
          label: 'Ma situation',
          sublabel: 'Actualité, e-documents',
          icon: 'conseiller',
          badge1: '5',
          badge2: 'new',
          a11yLabel: 'Coucou'
        },
        {
          label: 'Comptes & épargne',
          sublabel: 'Gestion des comptes, moyens de paiements',
          icon: 'carte-billets',
          isActive: 'true',
          submenu: [
            {
              path: '#',
              label: 'Mes comptes au quotidien',
              sublabel: 'Gérer mes comptes et mon budget'
            },
            {
              path: '#',
              label: 'Toute mon épargne'
            },
            {
              path: '#',
              label: 'Virement',
              isActive: 'true'
            },
            {
              path: '#',
              label: 'Cartes et chéquiers'
            }
          ]
        },
        {
          path: '#',
          label: 'Mes assurances',
          icon: 'conseiller'
        },
        {
          path: '#',
          label: 'Mes crédits',
          icon: 'conseiller'
        }
      ];
    });

    return tpl.content;
  })
  .add('Secondary', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML =
      '<bux-nav-bar id="nav" type="secondary" bubble-effect></bux-nav-bar>';

    const nav = tpl.content.querySelector('#nav');

    customElements.whenDefined('bux-nav-bar').then(() => {
      // Lui fournir les datas pour qu'il s'affiche
      nav.data = [
        {
          path: '#',
          label: 'Test 1',
          isActive: 'true'
        },
        {
          path: '#',
          label: 'Test 2'
        },
        {
          path: '#',
          label: 'Test 3'
        }
      ];
    });

    return tpl.content;
  })
  .add('Sociaux', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = '<bux-nav-bar id="nav" type="sociaux"></bux-nav-bar>';

    const nav = tpl.content.querySelector('#nav');

    customElements.whenDefined('bux-nav-bar').then(() => {
      // Lui fournir les datas pour qu'il s'affiche
      nav.data = [
        {
          path: '#',
          icon: 'facebook',
          badge1: '1',
          a11yLabel: 'Facebook'
        },
        {
          path: '#',
          icon: 'twitter',
          a11yLabel: 'Twitter'
        }
      ];
    });

    return tpl.content;
  })
  .add('Footer', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = '<bux-nav-bar id="nav" type="footer"></bux-nav-bar>';

    const nav = tpl.content.querySelector('#nav');

    customElements.whenDefined('bux-nav-bar').then(() => {
      // Lui fournir les datas pour qu'il s'affiche
      nav.data = [
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
  })

  .add('Footer Mobile', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = '<bux-nav-bar id="nav" type="footermobile"></bux-nav-bar>';

    const nav = tpl.content.querySelector('#nav');

    customElements.whenDefined('bux-nav-bar').then(() => {
      // Lui fournir les datas pour qu'il s'affiche
      nav.data = [
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
