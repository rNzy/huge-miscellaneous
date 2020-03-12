import './form.component.js';
export default {
  title: 'Components|Form',
  component: 'ux-form',
  includeStories: ['']
};

export const form = () => `
<ux-form>
<ux-input-item>
  <ux-label for="text">Email</ux-label>
  <ux-input-text id="text" name="text" placeholder="Entrer un texte"></ux-input-text>
</ux-input-item>
<ux-input-item>
  <ux-label for="password">Mot de passe</ux-label>
  <ux-input-password id="password" name="password" placeholder="Entrer un mot de passe"></ux-input-password>
</ux-input-item>
</ux-section>
<ux-btn model="primary">Valider</ux-btn>
</ux-form>
`;
