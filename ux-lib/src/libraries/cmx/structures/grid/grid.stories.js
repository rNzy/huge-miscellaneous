import './grid.component.js';

export default {
  title: 'Components|Grid',
  component: 'ux-grid',
  includeStories: ['']
};

// 2 colonnes

export const oneone = () => `
<ux-grid columns="1-1">
    <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
    <ux-text slot="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const onetwo = () => `
<ux-grid columns="1-2">
    <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
    <ux-text slot="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const twoone = () => `
<ux-grid columns="2-1">
    <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
    <ux-text slot="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const onethree = () => `
<ux-grid columns="1-3">
    <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
    <ux-text slot="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const threeone = () => `
<ux-grid columns="3-1">
    <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
    <ux-text slot="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

// 3 colonnes

export const oneoneone = () => `
<ux-grid columns="1-1-1">
  <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text slot="2" center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text right slot="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const oneonetwo = () => `
<ux-grid columns="1-1-2">
  <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text slot="2" center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text right slot="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const onetwoone = () => `
<ux-grid columns="1-2-1">
  <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text slot="2" center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text right slot="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const twooneone = () => `
<ux-grid columns="2-1-1">
  <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text slot="2" center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text right slot="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const oneoneoneone = () => `
<ux-grid columns="1-1-1-1">
  <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text slot="2" center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text slot="3" center>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
  <ux-text slot="4" right>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;

export const gap = () => `
<ux-grid columns="1-1" gap="md">
    <ux-text slot="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
    <ux-text slot="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed orci dui. In et tempus mauris. Suspendisse condimentum vitae nibh eget fermentum. Ut tempor interdum semper. </ux-text>
</ux-grid>
`;
