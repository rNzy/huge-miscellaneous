import './modal.component.js';

export default {
  title: 'Components|Messages/Modal',
  component: 'ux-modal',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const modal = () => `
<ux-modal open>
  <ux-text slot="modal-title" center uppercase>wawa modal title</ux-text>
  <ux-text>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perspiciatis
    iusto, accusantium esse molestias ipsum autem atque et quod dolorem quidem
    assumenda distinctio aliquam deserunt officiis perferendis asperiores eius
    pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
    laboriosam quisquam nostrum, recusandae at sunt eum dignissimos quasi
    cupiditate voluptate! Suscipit, tempore eveniet illo hic voluptatibus
    assumenda adipisci. Aliquid, quas!
  </ux-text>
  <ux-btn-group>
    <ux-btn model="secondary">secondary</ux-btn>
    <ux-btn model="primary">primary</ux-btn>
  </ux-btn-group>
</ux-modal>
`;

export const howToTriggerModal = () => `
<ux-btn model="primary" target-id="wawa">Trigger modal</ux-btn>
<ux-modal id="wawa">
  <ux-text slot="modal-title" center uppercase>wawa modal title</ux-text>
  <ux-text>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perspiciatis
    iusto, accusantium esse molestias ipsum autem atque et quod dolorem quidem
    assumenda distinctio aliquam deserunt officiis perferendis asperiores eius
    pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
    laboriosam quisquam nostrum, recusandae at sunt eum dignissimos quasi
    cupiditate voluptate! Suscipit, tempore eveniet illo hic voluptatibus
    assumenda adipisci. Aliquid, quas!
  </ux-text>
  <ux-btn-group>
    <ux-btn model="secondary">secondary</ux-btn>
    <ux-btn model="primary">primary</ux-btn>
  </ux-btn-group>
</ux-modal>
`;
