import './progress-ring.component.js';

export default {
  title: 'Components|Miscellaneous/Progress Ring',
  component: 'ux-progress-ring',
  includeStories: ['']
};

export const progressRing = () => `
<ux-progress-ring value="50">
	<ux-text tag="p" slot="content">Je suis un texte.</ux-text>
</ux-progress-ring>
`;
