import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './modal.documentation.md';
import './modal.component';

storiesOf('Molecules/Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
        <h2 id="focusEl" tabindex="0">Le focus va se faire ici à la fermeture</h2>
        <bux-modal id="buxModal"></bux-modal>
        <bux-btn id="btnModal">Open modal</bux-btn>
        <bux-btn id="updateBtnModal">Update modal</bux-btn>
      `;

    const modal = tpl.content.querySelector('#buxModal');
    const btnModal = tpl.content.querySelector('#btnModal');
    const updateBtnModal = tpl.content.querySelector('#updateBtnModal');

    customElements.whenDefined('bux-modal').then(() => {
      btnModal.addEventListener('click', () =>
        modal.init({
          label: 'Mon Titre',
          content: '<p>Je suis un contenu</p><p>deuxièmeligne</p>',
          labelFailure: 'annuler',
          labelSuccess: 'ok',
          onFailure: () => modal.close(),
          onSuccess: () => modal.close(),
          closable: true,
          autoOpen: true,
          focusBackElement: document.getElementById('focusEl')
        })
      );

      updateBtnModal.addEventListener('click', () => {
        // On va maintenant mettre à jour la modale
        modal.label = 'Mon Nouveau Titre';
        modal.content = '<p>Pour me fermer cliquer sur le bouton fermer</p>';
        modal.labelFailure = 'Nouveau Annuler';
        modal.labelSuccess = 'Fermer';
        modal.onFailure = () => alert('Nouvelle fonction sur failure');
        modal.onSuccess = () => modal.close();
        modal.closable = false;
        modal.update();
        modal.open();
      });
    });

    return tpl.content;
  })
  .add('Toast', () => {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
        <bux-modal id="buxModal"></bux-modal>
        <bux-btn id="btnModal">Open Toast</bux-btn>
      `;

    const modal = tpl.content.querySelector('#buxModal');
    const btnModal = tpl.content.querySelector('#btnModal');

    customElements.whenDefined('bux-modal').then(() => {
      btnModal.addEventListener('click', () =>
        modal.init({
          label: 'Mon Titre',
          content: '<p>Je suis un contenu</p><p>deuxièmeligne</p>',
          labelFailure: 'annuler',
          labelSuccess: 'ok',
          onFailure: () => modal.close(),
          onSuccess: () => modal.close(),
          type: 'toast',
        })
      );
    });

    return tpl.content;
  });
