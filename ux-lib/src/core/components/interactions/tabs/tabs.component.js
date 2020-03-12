import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = SlotChange(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-tabs">
    <div class="c-tabs__list" role="tablist">
        <slot name="tab"></slot>
    </div>
    <div class="c-tabs__content">
        <slot name="panel"></slot>
    </div>
</div>
`;

/**
 * Le composant bux-tabs est un container qui a deux enfants : bux-tabs-button & bux-tabs-panel.
 * <bux-tabs> est stateless.
 */

const tplbutton = document.createElement('template');
tplbutton.innerHTML = `<slot></slot>`;

const tplpanel = document.createElement('template');
tplpanel.innerHTML = `
<div class="js-container">
  <slot></slot>
</div>
`;

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
 * @prop {String} icon - icone à afficher
 */
export class TabsBase extends Base {
  static get properties() {
    return {
      tabactive: { type: 'number' },
      icon: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._onSlotChange = this._onSlotChange.bind(this);

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onClick = this._onClick.bind(this);

    this._tabSlot = this.shadowRoot.querySelector('slot[name=tab]');
    this._panelSlot = this.shadowRoot.querySelector('slot[name=panel]');

    // Le composant lie des tabs et des panels sémantiquement en utilisant `aria-labelledby` et `aria-controls`.
    this.slotChange(this._tabSlot, this._onSlotChange);
    this.slotChange(this._panelSlot, this._onSlotChange);
  }

  connectedCallback() {
    // On veut contrôler des events du composant avec les flèches du clavier et le clic de la souris.
    this.addEventListener('keydown', this._onKeyDown);
    this.addEventListener('click', this._onClick);

    this.setAttribute('role', 'tablist');
  }

  // On supprime les listener ajoutés par `connectedCallback`.
  disconnectedCallback() {
    this.removeEventListener('keydown', this._onKeyDown);
    this.removeEventListener('click', this._onClick);
  }

  // Fonction appelée à chaque fois qu'un élément est ajouté ou retiré d'un des slots shadow DOM.
  _onSlotChange() {
    this._linkPanels();
  }

  /**
   * Fonction liant les tabs avec leurs panels respectifs en utilisant `aria-labelledby` & `aria-controls`.
   * La méthode assure qu'un seul tab est actif à la fois.
   * Si la fonction devient un problème, on peut l'optimiser en s'occupant que des nouveaux éléments au lieu d'itérer
   * dans tous les enfants du composant.
   */
  _linkPanels() {
    const tabs = this._allTabs();
    // On ajout à chaque panel un attribut `aria-labelledby` référant le tab qui le contrôle.
    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (panel.tagName.toLowerCase() !== 'bux-tabs-panel') {
        return;
      }

      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
    });

    // On regarde si un des tabs est défini comme sélectionné (selected).
    // Sinon on sélectionne le premier tab.
    const selectedTab = tabs.find(tab => tab.selected) || tabs[0];

    // On switch vers le tab sélectionné.
    this._selectTab(selectedTab);
    // On active son panel associé.
    this._activateTab(selectedTab);
  }

  _allPanels() {
    return Array.from(this.querySelectorAll('bux-tabs-panel'));
  }

  _allTabs() {
    return Array.from(this.querySelectorAll('bux-tabs-button'));
  }

  _panelForTab(tab) {
    const panelId = tab.getAttribute('aria-controls');
    return this.querySelector(`#${panelId}`);
  }

  _prevTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected) - 1;

    return tabs[(newIdx + tabs.length) % tabs.length];
  }

  _firstTab() {
    const tabs = this._allTabs();
    return tabs[0];
  }

  _lastTab() {
    const tabs = this._allTabs();
    return tabs[tabs.length - 1];
  }

  _nextTab() {
    const tabs = this._allTabs();
    let newIdx = tabs.findIndex(tab => tab.selected) + 1;
    return tabs[newIdx % tabs.length];
  }

  // On déselectionne tous les tabs.
  resetTab() {
    const tabs = this._allTabs();
    tabs.forEach(tab => (tab.selected = false));
  }

  // On cache tous les panels.
  resetPanel() {
    const panels = this._allPanels();
    panels.forEach(panel => (panel.hidden = true));
  }

  /**
   *
   * @param {*} newTab
   * Fonction passant le tab voulu à sélectionné.
   */
  _selectTab(newTab) {
    this.resetTab();
    newTab.selected = true;
    newTab.focus();
  }

  /**
   *
   * @param {*} newTab
   * Fonctionnant affichant le panel associé au tab sélectionné.
   */
  _activateTab(newTab) {
    this.resetPanel();
    const newPanel = this._panelForTab(newTab);
    // Il pourrait être intéressant de péter un exception si on ne trouve le panel à associer.
    newPanel.hidden = false;
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

    let newTab;

    switch (event.keyCode) {
      case KEYCODE.LEFT:
      case KEYCODE.UP:
        newTab = this._prevTab();
        this._selectTab(newTab);
        break;

      case KEYCODE.RIGHT:
      case KEYCODE.DOWN:
        newTab = this._nextTab();
        this._selectTab(newTab);
        break;

      case KEYCODE.HOME:
        newTab = this._firstTab();
        this._selectTab(newTab);
        break;

      case KEYCODE.END:
        newTab = this._lastTab();
        this._selectTab(newTab);
        break;

      case KEYCODE.ENTER:
      case KEYCODE.SPACE:
        this._activateTab(event.target);
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
    this._activateTab(event.target);
  }
}

// Compte le nombre d'instances de `<bux-tabs-button>`. On utilise le nombre pour créer des IDs uniques.
let buxTabsButtonCounter = 0;

/**
 * `TabsButtonBase` est un onglet du <bux-tabs>. <bux-tabs> devrait toujours avoir un `role=heading` dans le markup
 * pour que la sémantique reste utilisable même quand le javascript est désactivé.
 *
 * `<bux-tabs>` déclare quel `<bux-tabs-panel>` lui est lié en utilisant l'id du panel comme valeur de l'attribut `aria-controls`.
 *
 * `<bux-tabs>` génère automatiquement un id unique si aucun est spécifié.
 *
 * @prop {Boolean} selected - est il selectionné ?
 */
export class TabsButtonBase extends Base {
  static get properties() {
    return {
      selected: { type: 'boolean' }
    };
  }

  constructor() {
    super();
  }

  template() {
    return tplbutton;
  }

  connectedCallback() {
    this.setAttribute('role', 'tab');
    if (!this.id)
      this.id = `bux-tabs-button-generated-${buxTabsButtonCounter++}`;

    this.setAttribute('aria-selected', 'false');
    this.tabIndex = -1;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'selected') {
      if (this.selected) {
        this.setAttribute('aria-selected', 'true');
        this.setAttribute('tabindex', 0);
      } else {
        this.setAttribute('aria-selected', 'false');
        this.setAttribute('tabindex', -1);
      }
    }
  }
}

// Compte le nombre d'instances de `<bux-tabs-panel>`.
let buxTabsPanelCounter = 0;

export class TabsPanelBase extends Base {
  constructor() {
    super();
  }

  template() {
    return tplpanel;
  }

  connectedCallback() {
    this.setAttribute('role', 'tabpanel');
    if (!this.id) this.id = `bux-tabs-panel-generated-${buxTabsPanelCounter++}`;
    this.tabIndex = 0;
  }
}
