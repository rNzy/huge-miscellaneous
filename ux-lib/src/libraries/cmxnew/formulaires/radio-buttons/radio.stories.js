import './radio-button.component';
import './radio-group.component';

export default {
  title: 'Components|Formulaires/Radio buttons',
  component: 'ux-radio-button',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const utilisation = () => `
<fieldset>
<legend>Beverages:</legend>
<ux-radio-group id="radios" space-v="sm">
  <ux-radio-button value="water">Water</ux-radio-button>
  <ux-radio-button value="soda">Soda</ux-radio-button>
  <ux-radio-button value="coffee">Coffee</ux-radio-button>
</ux-radio-group>
</fieldset>
`;

export const standAlone = () => `
<ux-radio-button value="water">Water</ux-radio-button>
`;

export const group = () => `
<fieldset>
<legend>Beverages:</legend>
<ux-radio-group id="radios" space-v="sm">
  <ux-radio-button value="water">Water</ux-radio-button>
  <ux-radio-button value="soda">Soda</ux-radio-button>
  <ux-radio-button value="coffee">Coffee</ux-radio-button>
</ux-radio-group>
</fieldset>
`;
