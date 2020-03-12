import TabsOnePanelBase from '../../../../core/components/interactions/tabs-base/tabs-one-panel/tabs-one-panel.component';
import TabsOnePanelBtnBase from '../../../../core/components/interactions/tabs-base/tabs-one-panel/tabs-one-panel-btn.component';
import TabsOnePanelPanelBase from '../../../../core/components/interactions/tabs-base/tabs-one-panel/tabs-one-panel-panel.component';

import styleTabs from './tabs-one-panel.style.css';
import styleTabsBtn from './tabs-one-panel-btn.style.css';

/**
 * Panel
 *
 * @class TabsOnePanel
 * @extends {TabsOnePanelBase}
 */
class TabsOnePanel extends TabsOnePanelBase {
  static get style() {
    return styleTabs.toString();
  }
}
customElements.define('ux-tabs-one-panel', TabsOnePanel);

/**
 * Tabs Btn
 *
 * @class TabsOnePanelBtn
 * @extends {TabsOnePanelBtnBase}
 */
class TabsOnePanelBtn extends TabsOnePanelBtnBase {
  static get style() {
    return styleTabsBtn.toString();
  }
}
customElements.define('ux-tabs-one-panel-btn', TabsOnePanelBtn);

/**
 * Tabs wrapper
 */
customElements.define('ux-tabs-one-panel-panel', TabsOnePanelPanelBase);
