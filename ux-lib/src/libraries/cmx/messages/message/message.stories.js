import './message.component.js';

export default {
  title: 'Components|Message',
  component: 'ux-message',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const warning = () => `
<ux-message type="warning">
  <ux-svg slot="icon" icon="warning" lib-size="md"></ux-svg>
  warning message
</ux-message>
`;

export const information = () => `
<ux-message type="info">
  message à caractère informatif
</ux-message>
`;

export const error = () => `
<ux-message type="error">
  message d'erreur
</ux-message>
`;
