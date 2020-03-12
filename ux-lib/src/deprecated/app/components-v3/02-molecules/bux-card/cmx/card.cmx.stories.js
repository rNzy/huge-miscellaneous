import centered from '@storybook/addon-centered/html';

import './card.component';
import './card-header.component';
import './card-body.component';
import './card-footer.component';

import '../../../01-atoms/bux-text/text.component';

export default {
  title: 'Components|Molecules/Card',
  decorators: [centered],
  // includeStories: [], // or simply don't load this file at all
  parameters: {
    componentSubtitle: 'Handy status label'
  }
};

/**
 * Use `Badge` to highlight key info with a predefined status. Easy peasy!
 */
export const simpleCard = () => `
  <bux2-card>
    <bux2-card-header>
      <bux2-text theme="part">Title inside card-header</bux2-text>
    </bux2-card-header>
    <bux2-card-body>Hello World inside the body</bux2-card-body>
    <bux2-card-footer>Card footer</bux2-card-footer>
  </bux2-card>
  `;
simpleCard.story = {
  name: 'default'
};

export const withoutHeader = () =>
  `<bux2-card>
    <bux2-card-body>Hello World inside the body</bux2-card-body>
    <bux2-card-footer>Card footer</bux2-card-footer>
  </bux2-card>
  `;

// import { storiesOf } from '@storybook/polymer';
// import { withKnobs, select, boolean } from '@storybook/addon-knobs/polymer';
// import { withReadme } from 'storybook-readme';

// import md from './../card.documentation.md';
// import './card.component';
// import './card-header.component';
// import './card-body.component';
// // import './card-bar.component';
// // import './card-scroller.compone<?xml version="1.0" encoding="UTF-8"?>
{
  /* <svg data-token-name="check" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M9.35221912,16.3536125 L19.5004166,5.34255149 C19.9029667,4.90884428 20.5808871,4.88358644 21.0145944,5.28613652 C21.4483016,5.6886866 21.4735594,6.36660707 21.0710093,6.80031428 L10.1375155,18.6574532 C9.71359736,19.1141823 8.99084087,19.1141823 8.56692275,18.6574532 L3.28613652,12.890538 C2.88358644,12.4568308 2.90884428,11.7789103 3.34255149,11.3763602 C3.77625869,10.9738101 4.45417917,10.999068 4.85672925,11.4327752 L9.35221912,16.3536125 Z" fill="currentColor"></path>
</svg>
// // import './card-tile.component';<?xml version="1.0" encoding="UTF-8"?>
<svg data-token-name="check" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M9.35221912,16.3536125 L19.5004166,5.34255149 C19.9029667,4.90884428 20.5808871,4.88358644 21.0145944,5.28613652 C21.4483016,5.6886866 21.4735594,6.36660707 21.0710093,6.80031428 L10.1375155,18.6574532 C9.71359736,19.1141823 8.99084087,19.1141823 8.56692275,18.6574532 L3.28613652,12.890538 C2.88358644,12.4568308 2.90884428,11.7789103 3.34255149,11.3763602 C3.77625869,10.9738101 4.45417917,10.999068 4.85672925,11.4327752 L9.35221912,16.3536125 Z" fill="currentColor"></path>
</svg> */
}
// import './card-footer.component';

// storiesOf('Molecules/Card', module)
//   .addDecorator(withKnobs)
//   .addDecorator(withReadme(md))
//   .add(
//     'space-v',
//     () => `
//         <bux2-card
//           noborder="${boolean('noborder', false)}"
//         >
//           <bux2-card-header
//             slot="card-header"
//           >Header
//           </bux2-card-header>

//           <bux2-card-body
//             slot="card-body"
//             background="${boolean('card-body background', false)}"
//             space-v="${select(
//               'card-body space-v',
//               ['xs', 'sm', 'md', 'lg', 'xl'],
//               'md'
//             )}"
//             space-all="${boolean('card-body space-all', false)}"
//           >

//             <bux2-card-tile
//             >Tile 1
//             </bux2-card-tile>
//             <bux2-card-tile
//             >Tile 2
//             </bux2-card-tile>

//           </bux2-card-body>

//           <bux2-card-bar
//             slot="card-body"
//             border-top="${boolean('card-bar border-top', false)}"
//             border-bottom="${boolean('card-bar border-bottom', false)}"
//             border-right="${boolean('card-bar border-right', false)}"
//             border-left="${boolean('card-bar border-left', false)}"
//             center="${boolean('card-bar center', false)}"
//             space-h="${select(
//               'card-bar space-h',
//               ['xs', 'sm', 'md', 'lg', 'xl'],
//               'md'
//             )}"
//             space-all="${boolean('card-bar space-all', false)}"
//           ><span>Bar item 1</span><span>Bar item 2</span><span>Bar item 3</span>
//           </bux2-card-bar>

//           <bux2-card-scroller
//             slot="card-body"
//             is-mobile="${boolean('card-scroller is-mobile', false)}"
//             is-desktop="${boolean('card-scroller is-desktop', true)}"
//           >Scroller
//           </bux2-card-scroller>

//           <bux2-card-footer
//             slot="card-footer"
//           >Footer
//           </bux2-card-footer>

//         </bux2-card>
//       `
//   )
//   .add(
//     'space-h',
//     () => `
//         <bux2-card
//           noborder="${boolean('noborder', false)}"
//         >
//           <bux2-card-header
//             slot="card-header"
//           >Header
//           </bux2-card-header>

//           <bux2-card-subheader
//             slot="card-body"
//           >Subheader
//           </bux2-card-subheader>

//           <bux2-card-body
//             slot="card-body"
//             background-light="${boolean('card-body background', false)}"
//             space-h="${select(
//               'card-body space-h',
//               ['xs', 'sm', 'md', 'lg', 'xl'],
//               'md'
//             )}"
//             space-all="${boolean('card-body space-all', false)}"
//           >

//             <bux2-card-tile
//             >Tile 1
//             </bux2-card-tile>
//             <bux2-card-tile
//             >Tile 2
//             </bux2-card-tile>

//           </bux2-card-body>

//           <bux2-card-bar
//             slot="card-body"
//             border-top="${boolean('card-bar border-top', false)}"
//             border-bottom="${boolean('card-bar border-bottom', false)}"
//             border-right="${boolean('card-bar border-right', false)}"
//             border-left="${boolean('card-bar border-left', false)}"
//             center="${boolean('card-bar center', false)}"
//             space-h="${select(
//               'card-bar space-h',
//               ['xs', 'sm', 'md', 'lg', 'xl'],
//               'md'
//             )}"
//             space-all="${boolean('card-bar space-all', false)}"
//           ><span>Bar item 1</span><span>Bar item 2</span><span>Bar item 3</span>
//           </bux2-card-bar>

//           <bux2-card-scroller
//             slot="card-body"
//             is-mobile="${boolean('card-scroller is-mobile', false)}"
//             is-desktop="${boolean('card-scroller is-desktop', true)}"
//           >Scroller
//           </bux2-card-scroller>

//           <bux2-card-footer
//             slot="card-footer"
//           >Footer
//           </bux2-card-footer>

//         </bux2-card>
//       `
//   );
