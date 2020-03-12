import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

import debounce from 'lodash.debounce';

const Base = SlotChange(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-tabs">
    <div class="c-tabs__list" role="tablist">
        <slot name="tab"></slot>
        <div class="c-tabs-elastic" aria-hidden="true"></div>
    </div>
    <div class="c-tabs__content">
        <slot name="panel"></slot>
    </div>
    
</div>
`;

let tabIds = 0;

/**
 * Key codes => Get keyboard events.
 */
const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  HOME: 36,
  END: 35,
  ENTER: 13,
  SPACE: 32
};

/**
 *
 *
 * @export
 * @class TabsBase
 * @extends {Base}
 *
 * @prop {Number} tabactive - numero de l'onglet actif
 * @prop {String} a11yTablistLabel - aria label global pour toutes les tabs (nécessaire)
 */
export default class TabsOnePanelBase extends Base {
  static get properties() {
    return {
      tabActive: {
        type: 'number'
      },
      a11yTablistLabel: {
        type: 'string'
      }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    // Fonction de click, de press touche, et de slot change
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClick = this._onClick.bind(this);
    this.initTabsId = this.initTabsId.bind(this);

    // Permet de gérer le glissement de la barre rouge sous l'élement actif
    this.elasticEl = this.$.querySelector('.c-tabs-elastic');
    this.resizeEv = debounce(() => {
      this.resize();
    }, 100);
    window.addEventListener('resize', this.resizeEv);
  }

  connectedCallback() {
    if (super.connectedCallback()) super.connectedCallback();

    // On veut contrôler des events du composant avec les flèches du clavier et le clic de la souris.
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);

    // Rajouter un id au btn (ne peut pas être fait dans les btn eux même car
    // difficile de savoir quand ils ont setter leur propre id aussi
    this.initTabsId();

    this.slotChange(
      this.shadowRoot.querySelector('slot[name=tab]'),
      this.initTabsId
    );

    // Initialise à 0 si pas de tab active
    if (!this.hasAttribute('tab-active')) this.tabActive = 0;

    // Mette la barre en dessous qui va glisser
    // Calculate size of one tabs.
    this.tabsBtn = this.querySelector('ux-tabs-one-panel-btn');

    // Wait one digest cycle
    Promise.resolve().then(() => {
      this.elasticEl.style.width = this.tabsBtn.offsetWidth + 'px';
    });
    // fin mettre la barre rouge qui va glisser
  }

  // On supprime les listener ajoutés par `connectedCallback`.
  disconnectedCallback() {
    if (super.disconnectedCallback()) super.disconnectedCallback();
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);

    window.removeEventListener('resize', this.resizeEv);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'tab-active') {
      if (this.tabActive != 'undefined' && this.tabActive != 'null') {
        const tabActiveEl = this._getTabByNumber(this.tabActive);
        if (tabActiveEl) {
          if (this.formItSelf) {
            this.formItSelf = false;
          } else {
            this._selectTab(tabActiveEl);
            this._activeTab(tabActiveEl);
            this.formItSelf = false;
          }
        }
      }
    } else if (name === 'a11y-tablist-label') {
      this.a11yTablistLabel
        ? this.$.querySelector('.c-tabs__list').setAttribute(
            'aria-label',
            this.a11yTablistLabel
          )
        : this.$.querySelector('.c-tabs__list').removeAttribute(
            'aria-label',
            this.a11yTablistLabel
          );
    }
  }

  /**
   * Met un id aux tabs btn
   */
  initTabsId() {
    this.allTabs.forEach(tab => {
      if (!tab.id) {
        tab.id = `tabs-one-panel-btn-${tabIds++}`;
      }
    });
  }

  /**
   * Retourne les ux-tabs-one-panel-panel
   *
   * @readonly
   * @memberof TabsOnePanelBase
   */
  get panel() {
    return this.querySelectorAll('ux-tabs-one-panel-panel');
  }

  /**
   * Retourne les ux-tabs-one-panel-btn
   *
   * @readonly
   * @memberof TabsOnePanelBase
   */
  get allTabs() {
    return [...this.querySelectorAll('ux-tabs-one-panel-btn')];
  }

  /**
   * Si on donne un numéro de tab retourne l'élément correspondant
   *
   * @param {*} num
   * @returns
   * @memberof TabsOnePanelBase
   */
  _getTabByNumber(num) {
    const tab = this.allTabs;
    if (tab.length - 1 >= num) {
      return this.allTabs[num];
    } else {
      return false;
    }
  }

  /**
   * Si on donne un element tab retourne sont numéro
   *
   * @param {*} tabEl
   * @returns
   * @memberof TabsOnePanelBase
   */
  _getNumberOfTab(tabEl) {
    let i;
    const tabs = this.allTabs;
    const l = tabs.length;
    let num = false;
    for (i = 0; i < l; i++) {
      if (tabEl === tabs[i]) {
        num = i;
        break;
      }
    }
    return num;
  }

  _prevTab() {
    const tabs = this.allTabs;
    const newIdx = tabs.findIndex(tab => tab.selected) - 1;
    return tabs[(newIdx + tabs.length) % tabs.length];
  }

  _firstTab() {
    return this.allTabs[0];
  }

  _lastTab() {
    const tabs = this.allTabs;
    return tabs[tabs.length - 1];
  }

  _nextTab() {
    const tabs = this.allTabs;
    const newIdx = tabs.findIndex(tab => tab.selected) + 1;
    return tabs[newIdx % tabs.length];
  }

  /**
   * Selectionne un tabs mais n'active pas le panel
   * @param {*} newTab
   * Fonction passant le tab voulu à sélectionné.
   */
  _selectTab(newTab) {
    // On déselectionne tous les tabs.
    this.allTabs.forEach(tab => (tab.selected = false));
    newTab.selected = true;
    newTab.focus();
  }

  /**
   * Animation sur le selected
   *
   * @param {*} newTab
   * @memberof TabsOnePanelBase
   */
  _animateSelected(newTab) {
    this.elasticEl.style.left = newTab.offsetLeft + 'px';
  }

  resize() {
    this.elasticEl.style.width = this.tabsBtn.offsetWidth + 'px';
    this._animateSelected(this._getTabByNumber(this.tabActive));
  }

  /**
   * Active le panel et change l'attibut tab-active
   * Et emet un event uxTabActive
   *
   * @param {*} newTab
   * @memberof TabsOnePanelBase
   */
  _activeTab(newTab) {
    this.formItSelf = true;
    this.tabActive = this._getNumberOfTab(newTab);
    this.panel[0].setAttribute('aria-labelledby', newTab.id);
    this._animateSelected(newTab);
    this.dispatchEvent(
      new CustomEvent('uxTabActive', {
        detail: {
          tab: newTab,
          tabNumber: this._getNumberOfTab(newTab)
        },
        bubbles: true
      })
    );
  }

  /**
   *
   * @param {*} event
   * Handler des interractions clavier.
   */
  _onKeyDown(event) {
    // Si l'event clavier ne vient pas d'un élément tab, do nothing.
    if (event.target.getAttribute('role') !== 'tab') return;

    // On évite les raccourcis utilisés par les aides logiciels.
    if (event.altKey) return;

    switch (event.keyCode) {
      case KEYCODE.LEFT:
      case KEYCODE.UP:
        this._selectTab(this._prevTab());
        break;
      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        this._selectTab(this._nextTab());
        break;
      case KEYCODE.HOME:
        this._selectTab(this._firstTab());
        break;

      case KEYCODE.END:
        this._selectTab(this._lastTab());
        break;

      case KEYCODE.ENTER:
      case KEYCODE.SPACE:
        this._activeTab(event.target);
        break;

      // Toute autre event clavier est ignoré.
      default:
        return;
    }

    // On évite les opérations natives du navigateur à la pression des boutons qu'on utilise.
    event.preventDefault();
  }

  /**
   *
   * @param {*} event
   * Handler des interractions souris.
   */
  _onClick(event) {
    if (event.target.getAttribute('role') !== 'tab') return;
    this._selectTab(event.target);
    this._activeTab(event.target);
  }
}
