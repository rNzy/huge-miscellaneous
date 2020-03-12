import TabsBasePanel from '../tabs-base-panel.component';

export default class TabsPanel extends TabsBasePanel {
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.setAttribute('slot', 'panel');
  }
}
