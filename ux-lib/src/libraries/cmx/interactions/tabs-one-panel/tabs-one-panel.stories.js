import './tabs-one-panel.component';

export default {
  title: 'Components|Tabs-one-panel',
  component: 'ux-tabs-one-panel',
  includeStories: ['']
};

export const tabs = () => `
<ux-tabs-one-panel>
  <ux-tabs-one-panel-btn>
    1
  </ux-tabs-one-panel-btn>
  <ux-tabs-one-panel-btn>
    2
  </ux-tabs-one-panel-btn>
  <ux-tabs-one-panel-btn>
    3
  </ux-tabs-one-panel-btn>
  <ux-tabs-one-panel-panel>
    <div>
      mon panel
    </div>
  </ux-tabs-one-panel-panel>
</ux-tabs-one-panel>
`;
