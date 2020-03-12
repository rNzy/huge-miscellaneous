import './flex.component.js';

export default {
  title: 'Components|Flex',
  component: 'ux-flex',
  includeStories: ['']
};

export const rowWrap = () => `
<ux-flex>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const rowNoWrap = () => `
<ux-flex nowrap>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const column = () => `
<ux-flex column>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const justifyStart = () => `
<ux-flex justify-content="start">
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const justifyCenter = () => `
<ux-flex justify-content="center">
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const justifySpaceAround = () => `
<ux-flex justify-content="space-around">
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const justifySpaceBetween = () => `
<ux-flex justify-content="space-between">
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const justifySpaceEvenly = () => `
<ux-flex justify-content="space-evenly">
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const alignStart = () => `
<ux-flex align-items="start">
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;

export const alignEnd = () => `
<ux-flex align-items="end">
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
  <div>
    <strong>Ceci est un texte !</strong></<strong>
    <small>Et ceci un sous-texte !</small></<small>
  </div>
</ux-flex>
`;
