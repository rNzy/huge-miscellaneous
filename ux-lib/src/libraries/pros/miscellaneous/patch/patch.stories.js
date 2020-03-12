import './patch.component.js';
import './smartphone.svg';
import './conseiller.svg';
import './agence.svg';

export default {
  title: 'Components|Miscellaneous/Patch',
  component: 'ux-patch',
  includeStories: ['']
};

export const patchPrimary = () => `
<ux-patch lib-bg-color="primary">
	<ux-svg slot="top" icon="smartphone" lib-size="xxl"></ux-svg>
	<ux-text slot="bottom" bold lib-size="lg" center>Je suis un patch avec une icône de smartphone.</ux-text>
</ux-patch>
`;

export const patchSecondary = () => `
<ux-patch lib-bg-color="secondary">
	<ux-svg slot="top" icon="agence" lib-size="xxl"></ux-svg>
	<ux-text slot="bottom" bold lib-size="lg" center>Je suis un patch avec une icône d'agence.</ux-text>
</ux-patch>
`;

export const patchTertiary = () => `
<ux-patch addshadow lib-bg-color="tertiary">
	<ux-svg slot="top" icon="conseiller" lib-size="xxl"></ux-svg>
	<ux-text slot="bottom" bold lib-size="lg" center>Je suis un patch avec une icône de conseiller.</ux-text>
</ux-patch>
`;
