import {
  TabsBase,
  TabsButtonBase,
  TabsPanelBase
} from '../../../../core/components/interactions/tabs/tabs.component';
import styleDefault from './tabs.style.css';
import styleSpecial from './tabs-special.style.css';

class Tabs extends TabsBase {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('bux3-tabs', Tabs);

class TabsButton extends TabsButtonBase {
  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'selected') {
      let hasIcon = this.querySelector('bux2-svg');
      if (hasIcon) {
        if (this.selected) {
          hasIcon.setAttribute('theme', 'white');
        } else {
          hasIcon.removeAttribute('theme');
        }
      }
    }
  }
}
customElements.define('bux-tabs-button', TabsButton);

class TabsPanel extends TabsPanelBase {}
customElements.define('bux-tabs-panel', TabsPanel);

class TabsSpecial extends TabsBase {
  static get style() {
    return styleSpecial.toString();
  }
}
customElements.define('bux3-tabs-special', TabsSpecial);
