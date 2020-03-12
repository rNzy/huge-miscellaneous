import TabsBase from '../tabs-base.component';

export default class Tabs extends TabsBase {
  constructor() {
    super();

    // Le composant lie des tabs et des panels sémantiquement en utilisant `aria-labelledby` et `aria-controls`.
    this._linkPanels = this._linkPanels.bind(this);
    this.slotChange(this.$.querySelector('slot[name=tab]'), this._linkPanels);
    this.slotChange(this.$.querySelector('slot[name=panel]'), this._linkPanels);
  }

  /**
   * Fonction liant les tabs avec leurs panels respectifs en utilisant `aria-labelledby` & `aria-controls`.
   * La méthode assure qu'un seul tab est actif à la fois.
   * Si la fonction devient un problème, on peut l'optimiser en s'occupant que des nouveaux éléments au lieu d'itérer
   * dans tous les enfants du composant.
   */
  _linkPanels() {
    const tabs = this.allTabs;

    // On ajout à chaque panel un attribut `aria-labelledby` référant le tab qui le contrôle.
    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      if (
        panel.tagName.toLowerCase() !== 'ux-tabs-panel' &&
        panel.tagName.toLowerCase() !== 'bux-tabs-panel'
      ) {
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
    this._activeTab(selectedTab);
  }

  _panelForTab(tab) {
    const panelId = tab.getAttribute('aria-controls');
    return this.querySelector(`#${panelId}`);
  }

  /**
   *
   * @param {*} newTab
   * Fonctionnant affichant le panel associé au tab sélectionné.
   */
  _activeTab(newTab) {
    super._activeTab(newTab);

    // On cache tous les panels.
    [...this.querySelectorAll('ux-tabs-panel, bux-tabs-panel')].forEach(
      panel => (panel.hidden = true)
    );

    // On affiche le bon
    const panel = this._panelForTab(newTab);
    if (panel) this._panelForTab(newTab).hidden = false;
  }
}
