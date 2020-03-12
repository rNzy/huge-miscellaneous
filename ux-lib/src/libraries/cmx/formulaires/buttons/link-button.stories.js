import './link-button.component.js';

export default {
  title: 'Components|LinkButtons',
  component: 'ux-link-btn',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const allLinkButtons = () => `
<ux-link-btn type="primary" href="#">Lien</ux-link-btn>
<ux-link-btn type="primary" href="#" target-blank>Lien ouvrant dans une nouvelle fenêtre</ux-link-btn>
`;

export const link = () => `
<ux-link-btn type="primary" href="#">Lien</ux-link-btn>
`;

export const targetBlankLink = () => `
<ux-link-btn type="primary" href="#" target-blank>Lien ouvrant dans une nouvelle fenêtre</ux-link-btn>
`;
