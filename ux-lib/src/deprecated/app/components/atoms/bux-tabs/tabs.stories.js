import { storiesOf } from '@storybook/polymer';
import { withKnobs, number, select, boolean } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './tabs.documentation.md';

import './tabs.component';

storiesOf('Atoms/Tabs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-tabs
        tabactive="${number('tabactive', 0)}"
        type="${select('type', ['default', 'dropdown'], 'default')}"
        nocontainer="${boolean('nocontainer', false)}"
        >
        <div class="c-tabs__data" title="Paiements étalables">
          <h3>Titre de la section</h3>
          <p>Paragraphe</p>
          <p>Ici trois balises</p>
        </div>
        <div class="c-tabs__data" title="Étalements modifiables">
          Contenu sans div balise wrapper
        </div>
        <div class="c-tabs__data" title="Étalements enregistrés">
          <div>
            <h3>Titre de la section</h3>
            <p>Paragraphe</p>
            <p>Ici trois balises mais une div les wrappes</p>
          </div>
        </div>
      </bux-tabs>
      `;
  })
  .add('with Icons', () => {
    return `
      <bux-tabs
        tabactive="${number('tabactive', 0)}"
        type="${select('type', ['default', 'dropdown'], 'dropdown')}"
        nocontainer="${boolean('nocontainer', false)}"
        >
        <div class="c-tabs__data" title="Paiements étalables" data-icon="messagerie">
          <h3>Titre de la section</h3>
          <p>Paragraphe</p>
          <p>Ici trois balises</p>
        </div>
        <div class="c-tabs__data" title="Étalements modifiables" data-icon="portefeuille">
          Contenu sans div balise wrapper
        </div>
        <div class="c-tabs__data" title="Étalements enregistrés" data-icon="enveloppe">
          <div>
            <h3>Titre de la section</h3>
            <p>Paragraphe</p>
            <p>Ici trois balises mais une div les wrappes</p>
          </div>
        </div>
      </bux-tabs>
      `;
  });
