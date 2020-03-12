import './input-tel.component.js';
import './input-number.components.js';
import './input-email.component.js';
import './input-text.component.js';

export default {
  title: 'Components|Inputs',
  component: 'ux-input',
  includeStories: ['']
};

export const inputs = () => `
<div>
  <ux-label for="text">Texte</ux-label>
  <ux-input-text id="text" name="text" placeholder="Entrer un wawatext"></ux-input-text>
</div>
<div>
  <ux-label for="number">Nombre</ux-label>
  <ux-input-number id="number" name="number" placeholder="Entrer un wawanombre"></ux-input-number>
</div>
<div>
  <ux-label for="telephone">Téléphone</ux-label>
  <ux-input-tel id="telephone" name="telephone" placeholder="Numéro de Wawaphone"></ux-input-tel>
</div>
<div>
  <ux-label for="email">Email</ux-label>
  <ux-input-email id="email" name="email" placeholder="Adresse wawamail"></ux-input-email>
</div>
<div>
  <ux-label for="password">Mot de passe</ux-label>
  <ux-input-password id="password" name="password" placeholder="Entrer un mot de passe"></ux-input-password>
</div>
`;
