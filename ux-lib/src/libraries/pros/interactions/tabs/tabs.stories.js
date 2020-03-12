import './tabs.component.js';

export default {
  title: 'Components|Tabs',
  component: 'bux-tabs',
  includeStories: ['']
};

export const tabs = () => `
<bux3-tabs>
  <bux-tabs-button  slot="tab">
    Tab 1
  </bux-tabs-button>
  <bux-tabs-panel  slot="panel">
  <h3>Content 1</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum risus ac tempus pellentesque. Nulla vel justo sed augue suscipit accumsan. Nullam tincidunt tellus magna, ac fermentum arcu elementum vitae. Curabitur ac ultricies tellus, et ornare lectus. Phasellus lobortis in tortor ut ullamcorper. Duis a aliquet odio. Praesent maximus pretium pretium.</p>
    <p>Maecenas vulputate augue sagittis ultrices porttitor. Nunc venenatis elit nunc, non interdum dolor semper id. Quisque vehicula aliquam aliquet. Proin porta, ex sit amet lacinia pretium, erat sapien ornare nibh, quis dapibus dolor sapien ut mauris. Integer vel neque urna. Maecenas pulvinar cursus nisi. Nulla eu cursus orci. Etiam egestas felis tempor erat pretium, vel eleifend lectus feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
  </bux-tabs-panel>
  <bux-tabs-button  slot="tab">
    Tab 2
  </bux-tabs-button>
  <bux-tabs-panel  slot="panel">
    <h3>Content 2</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum risus ac tempus pellentesque. Nulla vel justo sed augue suscipit accumsan. Nullam tincidunt tellus magna, ac fermentum arcu elementum vitae. Curabitur ac ultricies tellus, et ornare lectus. Phasellus lobortis in tortor ut ullamcorper. Duis a aliquet odio. Praesent maximus pretium pretium.</p>
    <p>Maecenas vulputate augue sagittis ultrices porttitor. Nunc venenatis elit nunc, non interdum dolor semper id. Quisque vehicula aliquam aliquet. Proin porta, ex sit amet lacinia pretium, erat sapien ornare nibh, quis dapibus dolor sapien ut mauris. Integer vel neque urna. Maecenas pulvinar cursus nisi. Nulla eu cursus orci. Etiam egestas felis tempor erat pretium, vel eleifend lectus feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
  </bux-tabs-panel>
  <bux-tabs-button  slot="tab">
    Tab 3
  </bux-tabs-button>
  <bux-tabs-panel  slot="panel">
    <h3>Content 3</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vestibulum risus ac tempus pellentesque. Nulla vel justo sed augue suscipit accumsan. Nullam tincidunt tellus magna, ac fermentum arcu elementum vitae. Curabitur ac ultricies tellus, et ornare lectus. Phasellus lobortis in tortor ut ullamcorper. Duis a aliquet odio. Praesent maximus pretium pretium.</p>
    <p>Maecenas vulputate augue sagittis ultrices porttitor. Nunc venenatis elit nunc, non interdum dolor semper id. Quisque vehicula aliquam aliquet. Proin porta, ex sit amet lacinia pretium, erat sapien ornare nibh, quis dapibus dolor sapien ut mauris. Integer vel neque urna. Maecenas pulvinar cursus nisi. Nulla eu cursus orci. Etiam egestas felis tempor erat pretium, vel eleifend lectus feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
  </bux-tabs-panel>
</bux3-tabs>
`;
