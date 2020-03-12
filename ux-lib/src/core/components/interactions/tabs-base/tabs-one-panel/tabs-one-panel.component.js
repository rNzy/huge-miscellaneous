import TabsBase from '../tabs-base.component';

let count = -1;

export default class TabsOnePanel extends TabsBase {
  constructor() {
    super();
    this.initTabsId = this.initTabsId.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback()) super.connectedCallback();

    // Rajouter un id au btn (ne peut pas être fait dans les btn eux même car
    // difficile de savoir quand ils ont setter leur propre id aussi
    this.initTabsId();
    this.slotChange(this.$.querySelector('slot[name=tab]'), this.initTabsId);
  }

  /**
   * Met un id aux tabs btn
   */
  initTabsId() {
    this.allTabs.forEach(tab => {
      if (!tab.id) {
        tab.id = `tabs-one-panel-btn-${count++}`;
      }
    });
  }

  /**
   * Active le panel et change l'attibut tab-active
   * Et emet un event uxTabActive
   *
   * @param {*} newTab
   * @memberof TabsOnePanelBase
   */
  _activeTab(newTab) {
    super._activeTab(newTab);

    this.querySelectorAll('ux-tabs-one-panel-panel')[0].setAttribute(
      'aria-labelledby',
      newTab.id
    );
  }
}
