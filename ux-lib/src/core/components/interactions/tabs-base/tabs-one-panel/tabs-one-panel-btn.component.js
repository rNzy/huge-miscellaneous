import TabsBaseBtn from '../tabs-base-btn.component';

export default class TabsOnePanelBtnBase extends TabsBaseBtn {
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.setAttribute('slot', 'tab');
  }
}
