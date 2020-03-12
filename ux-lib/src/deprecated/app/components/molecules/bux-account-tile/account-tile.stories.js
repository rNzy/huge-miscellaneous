import { storiesOf } from '@storybook/polymer';
import { withKnobs, select } from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';
import './account-tile.component';
import md from './account-tile.documentation.md';

storiesOf('Molecules/Account tile', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `<bux-account-tile
    data-account-model="${select(
      'data-account-model (type)',
      ['simple', 'simple-2', 'heading', 'complete', 'variant'],
      'default'
    )}"
    data-account-type="saving"
    data-account-label="Livret bleu"
    data-account-label-level="2"
    data-account-holder="Patrick René"
    data-account-coholder="Roxanne Bisaillon"
    data-account-amount="2315.55"
    data-account-currency="EUR"
    data-account-details="Aucun versement programmé"
    data-account-details-to-come-up="-500.00"
    data-account-brand="Marque"
    data-account-details="Aucun versement programmé"
    data-account-details-amount-scheduled-payment="215.25"
    data-account-details-amount-scheduled-currency="USD"
    data-account-details-amount-scheduled-payment-period="an"
    data-account-link-url="detail.html"
    shadow
    data-account-switch-account-id-btn="modalSwitchComptesBtn"
    ></bux-account-tile>
    <p>Pour les options disponibles pour chaque type: voir l'onglet "Readme"</p>
    <p>Pour la vairante "variant" agandir la fenêtre au delà du format tablette pour voir la différence avec "complete"</p>`;
    // return `
    //   <bux-account-tile
    //     account-model="${select('account-model', [
    //       'simple',
    //       'simple-2',
    //       'complete',
    //       'variants'
    //     ])}"
    //     account-type="${select('account-type (only variants model)', [
    //       'account',
    //       'saving',
    //       'saving-mt',
    //       'saving-lt',
    //       'revolving'
    //     ])}"
    //     account-label="${text('account-label', 'Mon compte 1')}"
    //     account-brand="${text('account-brand', 'Crédit Maritime Belge')}"
    //     account-holder="${text('account-holder', 'Mon nom')}"
    //     account-coholder="${text('account-coholder', 'Nom co-titulaire')}"
    //     account-details="${text('account-details', 'Mis à jour à 20h45')}"
    //     account-amount="${text('account-amount', '200.20')}"
    //     account-link-url="${text('account-link-url', 'detail.html')}"
    //   </bux-account-tile>
    //   `;
  });
