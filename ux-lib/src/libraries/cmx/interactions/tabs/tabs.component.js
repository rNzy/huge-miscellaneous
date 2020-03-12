import TabsBase from '../../../../core/components/interactions/tabs-base/tabs/tabs.component';
import TabsBtnBase from '../../../../core/components/interactions/tabs-base/tabs/tabs-btn.component';
import TabsPanelBase from '../../../../core/components/interactions/tabs-base/tabs/tabs-panel.component';

import styleTabs from './tabs.style.css';
import styleSpecial from './tabs-special.style.css';
import styleTabsBtn from './tabs-btn.style.css';

/**
 * Master
 *
 * @class Tabs
 * @extends {TabsBase}
 */
class Tabs extends TabsBase {
  static get style() {
    return styleTabs.toString();
  }
}
customElements.define('ux-tabs', Tabs);
class TabsRetro extends TabsBase {
  static get style() {
    return styleTabs.toString();
  }
}
customElements.define('bux3-tabs', TabsRetro); // retro compatibilite

class TabsSpecial extends TabsBase {
  static get style() {
    return styleSpecial.toString();
  }
}
customElements.define('bux3-tabs-special', TabsSpecial); // Special

/**
 * Button
 *
 * @class TabsBtn
 * @extends {TabsBtnBase}
 */
class TabsBtn extends TabsBtnBase {
  static get style() {
    return styleTabsBtn.toString();
  }
}
customElements.define('ux-tabs-btn', TabsBtn);

class TabsBtnRetro extends TabsBtnBase {
  static get style() {
    return styleTabsBtn.toString();
  }
}
customElements.define('ux-tabs-button', TabsBtnRetro); // retro compatibilite
class TabsBtnRetroRetro extends TabsBtnBase {
  static get style() {
    return styleTabsBtn.toString();
  }
}
customElements.define('bux-tabs-button', TabsBtnRetroRetro); // retro compatibilite

/**
 * Panel
 */
customElements.define('ux-tabs-panel', TabsPanelBase);
class TabsPanelRetro extends TabsBtnBase {}
customElements.define('bux-tabs-panel', TabsPanelRetro); // retro compatibilite
