import TabsBase from '../../../../core/components/interactions/tabs-base/tabs/tabs.component';
import TabsBtnBase from '../../../../core/components/interactions/tabs-base/tabs/tabs-btn.component';
import TabsPanelBase from '../../../../core/components/interactions/tabs-base/tabs/tabs-panel.component';

import styleTabs from './tabs.style.css';
import styleTabsBtn from './tabs-btn.style.css';

/**
 * Permet de créer des onglets affichant des contenus.
 */
class Tabs extends TabsBase {
  static get style() {
    return styleTabs.toString();
  }
}
customElements.define('ux-tabs', Tabs);

class TabsBtn extends TabsBtnBase {
  static get style() {
    return styleTabsBtn.toString();
  }
}
class TabsBtn2 extends TabsBtnBase {
  static get style() {
    return styleTabsBtn.toString();
  }
}
customElements.define('ux-tabs-button', TabsBtn);
customElements.define('ux-tabs-btn', TabsBtn2);

customElements.define('ux-tabs-panel', TabsPanelBase);
