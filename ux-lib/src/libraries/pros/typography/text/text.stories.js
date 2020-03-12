import './text.component.js';

export default {
  title: 'Components|Text',
  component: 'ux-text',
  includeStories: ['']
};

export const span = () => `
<ux-text>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const paragraph = () => `
<ux-text tag="p">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const bold = () => `
<ux-text bold>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const strong = () => `
<ux-text tag="strong">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const italic = () => `
<ux-text italic>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const uppercase = () => `
<ux-text uppercase>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const center = () => `
<ux-text center>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const left = () => `
<ux-text left>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const right = () => `
<ux-text right>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
`;

export const sizes = () => `
<ux-text tag="p" lib-size="xs">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
<ux-text tag="p" lib-size="sm">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>
<ux-text tag="p" lib-size="md">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas inventore iste
  sapiente tenetur dolores atque quis optio odio quia nostrum praesentium
  mollitia minus officiis distinctio quaerat, eligendi adipisci necessitatibus
  doloribus?
</ux-text>

`;
