import './sref.component';

export default {
  title: 'Components|Helpers',
  component: 'ux-sref',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const sref = () => `
<ux-link sref>
  <ux-sref ui-sref="detail.creernumero({cardNumber:vm.carte.cardNumber})"></ux-sref>
</ux-link>
`;
