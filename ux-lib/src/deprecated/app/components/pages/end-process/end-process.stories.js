import { storiesOf } from '@storybook/polymer';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';

import './end-process.component';
import md from './end-process.documentation.md';

storiesOf('Pages/End Process', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add('default', () => {
    return `
      <bux-end-process
        type="${select(
          'type',
          [
            'success',
            'error',
            'smi',
            'underConstruction',
            'debranchement',
            'nimporteQuoi'
          ],
          'success'
        )}"
        data-label="${text(
          'data-label',
          'Votre demande d’étalement a bien été prise en compte'
        )}"
        data-sublabel="${text(
          'data-sublabel',
          'Vous pouvez modifier cet étalement tant que le premier prélèvement n’a pas été effectué.'
        )}"
        data-label-button="${text('data-label-button', 'Terminer')}"
        data-url="${text('data-url', '/salut')}"
        data-html="${text(
          'data-html',
          '<div><strong>Je suis de html</strong></div>'
        )}"
        data-type-button="${select(
          'data-type-button',
          ['link', 'button'],
          'link'
        )}"
        data-icon="${text('data-icon', 'pen')}"
        >
      </bux-end-process>
      `;
  })
  .add('success', () => {
    return `
      <bux-end-process
        type="success"
        data-label="${text(
          'data-label',
          'Votre demande d’étalement a bien été prise en compte'
        )}"
        data-sublabel="${text(
          'data-sublabel',
          'Vous pouvez modifier cet étalement tant que le premier prélèvement n’a pas été effectué.'
        )}"
        data-label-button="${text('data-label-button', 'Terminer')}">
      </bux-end-process>
      `;
  })
  .add('error', () => {
    return `
      <bux-end-process
        type="error"
        data-label="${text(
          'data-label',
          'Votre demande d’étalement a bien été prise en compte'
        )}"
        data-sublabel="${text(
          'data-sublabel',
          'Vous pouvez modifier cet étalement tant que le premier prélèvement n’a pas été effectué.'
        )}"
        data-label-button="${text('data-label-button', 'Terminer')}">
      </bux-end-process>
      `;
  })
  .add('SMI', () => {
    return '<bux-end-process type="smi"></bux-end-process>';
  })
  .add('Under construction', () => {
    return '<bux-end-process type="underConstruction" data-url="monurl"></bux-end-process>';
  })
  .add('debranchement', () => {
    return '<bux-end-process type="debranchement" data-url="monurl"></bux-end-process>';
  })
  .add('Other', () => {
    return `
      <bux-end-process
        type="${text('type', 'loupe')}"
        data-html="${text(
          'data-html',
          `<p>Nous n'avons pas trouvé de fonctionnalité correspondant à la recherche
        <br/><strong>test</strong></p><bux-message type="info"><p>Vérifiez l'orthographe ou relancer une recherche avec de nouveaux termes</p></bux-message>`
        )}"
      </bux-end-process>
      `;
  });
