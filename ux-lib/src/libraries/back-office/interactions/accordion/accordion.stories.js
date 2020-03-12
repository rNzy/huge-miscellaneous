import './accordion-item.component.js';

export default {
  title: 'Components|Accordion',
  component: 'ux-accordion-item',
  // permet d'afficher les stories avec le fichier .mdx, sans "collision" de titre de stories
  includeStories: ['']
};

export const accordions = () => `
<ux-accordion-item expanded level="4">
  <div slot="accordion-header">Titre accordeon item 1</div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem aspernatur
    ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas omnis esse
    voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem
    aspernatur ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas
    omnis esse voluptas?
  </div>
</ux-accordion-item>
<ux-accordion-item>
  <div slot="accordion-header">Titre accordeon item 2</div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem aspernatur
    ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas omnis esse
    voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem
    aspernatur ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas
    omnis esse voluptas?
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem aspernatur
    ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas omnis esse
    voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem
    aspernatur ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas
    omnis esse voluptas?
  </div>
</ux-accordion-item>
<ux-accordion-item>
  <div slot="accordion-header">Titre accordeon item 3</div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem aspernatur
    ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas omnis esse
    voluptas?
  </div>
</ux-accordion-item>
`;

export const accordionDefault = () => `
<ux-accordion-item>
  <div slot="accordion-header">Titre accordeon item 1</div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem aspernatur
    ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas omnis esse
    voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem
    aspernatur ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas
    omnis esse voluptas?
  </div>
</ux-accordion-item>
`;

export const accordionExpanded = () => `
<ux-accordion-item expanded>
  <div slot="accordion-header">Titre accordeon item 1</div>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem aspernatur
    ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas omnis esse
    voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi beatae reiciendis quia, quidem
    aspernatur ut suscipit enim quo tempore dolores perspiciatis necessitatibus obcaecati tempora saepe natus quas
    omnis esse voluptas?
  </div>
</ux-accordion-item>
`;
