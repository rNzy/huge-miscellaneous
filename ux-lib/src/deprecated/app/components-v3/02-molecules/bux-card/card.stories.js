import { storiesOf } from '@storybook/polymer';
import {
  withKnobs,
  select,
  boolean
} from '@storybook/addon-knobs/polymer';
import { withReadme } from 'storybook-readme';

import md from './card.documentation.md';
import './card.component';
import './card-header.component';
import './card-subheader.component';
import './card-body.component';
import './card-bar.component';
import './card-scroller.component';
import './card-tile.component';
import './card-footer.component';

storiesOf('V2/Molecules/Card', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(md))
  .add(
    'space-v',
    () => `
        <bux2-card
          noborder="${boolean('noborder', false)}"
        >
          <bux2-card-header
            slot="card-header"
          >Header
          </bux2-card-header>

          <bux2-card-subheader
            slot="card-body"
          >Subheader
          </bux2-card-subheader>

          <bux2-card-body
            slot="card-body"
            background="${boolean('card-body background', false)}"
            space-v="${select('card-body space-v', ['xs', 'sm', 'md', 'lg', 'xl'], 'md')}"
            space-all="${boolean('card-body space-all', false)}"
          >

            <bux2-card-tile
            >Tile 1
            </bux2-card-tile>
            <bux2-card-tile
            >Tile 2
            </bux2-card-tile>

          </bux2-card-body>

          <bux2-card-bar
            slot="card-body"
            border-top="${boolean('card-bar border-top', false)}"
            border-bottom="${boolean('card-bar border-bottom', false)}"
            border-right="${boolean('card-bar border-right', false)}"
            border-left="${boolean('card-bar border-left', false)}"
            center="${boolean('card-bar center', false)}"
            space-h="${select('card-bar space-h', ['xs', 'sm', 'md', 'lg', 'xl'], 'md')}"
            space-all="${boolean('card-bar space-all', false)}"
          ><span>Bar item 1</span><span>Bar item 2</span><span>Bar item 3</span>
          </bux2-card-bar>

          <bux2-card-scroller
            slot="card-body"
            is-mobile="${boolean('card-scroller is-mobile', false)}"
            is-desktop="${boolean('card-scroller is-desktop', true)}"
          >Scroller
          </bux2-card-scroller>

          <bux2-card-footer
            slot="card-footer"
          >Footer
          </bux2-card-footer>
          
        </bux2-card>
      `
  )
  .add(
    'space-h',
    () => `
        <bux2-card
          noborder="${boolean('noborder', false)}"
        >
          <bux2-card-header
            slot="card-header"
          >Header
          </bux2-card-header>

          <bux2-card-subheader
            slot="card-body"
          >Subheader
          </bux2-card-subheader>

          <bux2-card-body
            slot="card-body"
            background-light="${boolean('card-body background', false)}"
            space-h="${select('card-body space-h', ['xs', 'sm', 'md', 'lg', 'xl'], 'md')}"
            space-all="${boolean('card-body space-all', false)}"
          >

            <bux2-card-tile
            >Tile 1
            </bux2-card-tile>
            <bux2-card-tile
            >Tile 2
            </bux2-card-tile>
            
          </bux2-card-body>

          <bux2-card-bar
            slot="card-body"
            border-top="${boolean('card-bar border-top', false)}"
            border-bottom="${boolean('card-bar border-bottom', false)}"
            border-right="${boolean('card-bar border-right', false)}"
            border-left="${boolean('card-bar border-left', false)}"
            center="${boolean('card-bar center', false)}"
            space-h="${select('card-bar space-h', ['xs', 'sm', 'md', 'lg', 'xl'], 'md')}"
            space-all="${boolean('card-bar space-all', false)}"
          ><span>Bar item 1</span><span>Bar item 2</span><span>Bar item 3</span>
          </bux2-card-bar>

          <bux2-card-scroller
            slot="card-body"
            is-mobile="${boolean('card-scroller is-mobile', false)}"
            is-desktop="${boolean('card-scroller is-desktop', true)}"
          >Scroller
          </bux2-card-scroller>

          <bux2-card-footer
            slot="card-footer"
          >Footer
          </bux2-card-footer>
            
        </bux2-card>
      `
  );
