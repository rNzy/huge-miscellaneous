import './input-item.component.js';
import './input-text.component.js';

export default {
  title: 'Components|Inputs',
  component: 'ux-input',
  includeStories: ['']
};

export const inputs = () => `
<ux-input-item>
  <ux-label for="text">Texte</ux-label>
  <ux-input-text id="text" name="text" placeholder="Entrer un texte"></ux-input-text>
</ux-input-item>
<ux-input-item>
  <ux-label for="password">Mot de passe</ux-label>
  <ux-input-password id="password" name="password" placeholder="Entrer un mot de passe"></ux-input-password>
</ux-input-item>
`;
