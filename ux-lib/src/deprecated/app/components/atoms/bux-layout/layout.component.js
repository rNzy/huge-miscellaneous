const styleDefault = require('./layout.default.css');

const template = document.createElement('template');
template.innerHTML = `
<style>
${styleDefault}
</style>
<section class="js-container">
  <slot></slot>
</section>
`;

window.ShadyCSS && ShadyCSS.prepareTemplate(template, 'bux-layout');

class Layout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.onMutation = false;

    this.container = this.shadowRoot.querySelector('.js-container');

    this.navigator = this.getNavigator();
  }

  getNavigator() {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null)
        return tem
          .slice(1)
          .join(' ')
          .replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return {
      name: M[0],
      version: M[1]
    };
  }

  attributeChangedCallback() {
    this.container.classList.add('grid-masonry');
    this._defineItems();
    this._resizeAllGridItems();
  }

  connectedCallback() {
    window.ShadyCSS && ShadyCSS.styleElement(this);
    this.container.classList.add('grid-masonry');
    setTimeout(() => {
      this._defineItems();
      this._resizeAllGridItems();
      this._mutationObserver(this);
    }, 200);
  }

  // get slotted content
  _allItems() {
    return Array.from(this.children);
  }

  // set item classes
  _defineItems() {
    const items = this._allItems();

    items.forEach(item => {
      if (item.classList.contains('grid-item')) return;
      item.classList.add('grid-item');
    });
  }

  // Find item Heigh
  _getHeighItem(item) {
    const grid = this.shadowRoot.querySelector('.grid-masonry');
    const rowHeight = 0;
    const rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
    );

    let itemH;

    // EDGE FIX and Old firefox getBoundingClientRect return bad value
    // beacause of shadow
    if (
      this.navigator.name === 'Edge' ||
      (this.navigator.name === 'Firefox' && this.navigator.version <= '62')
    ) {
      itemH = item.getBoundingClientRect().height;
      if (item.tagName === 'BUX2-CARD') {
        itemH =
          item.shadowRoot.querySelector('section').getBoundingClientRect()
            .height + 20; //
      }
    } else {
      grid.style.gridAutoRows = 0;
      itemH = item.getBoundingClientRect().height;
    }

    return Math.ceil((itemH + rowGap) / (rowHeight + rowGap));
  }

  // get all grid items and for each items add methods
  // Find all item chield Heigh
  // Apply to all chield a new gridRowEnd
  _resizeAllGridItems() {
    const allItems = this.getElementsByClassName('grid-item');

    const allH = [];
    const l = allItems.length;

    for (let i = 0; i < l; i++) {
      // instantiate the resizeGridItem method on each item
      allH[i] = this._getHeighItem(allItems[i]);
    }

    for (let i = 0; i < l; i++) {
      // instantiate the resizeGridItem method on each item
      allItems[i].style.gridRowEnd = 'span ' + allH[i];
    }
  }

  // Mutation observer method
  _mutationObserver(targetNode) {
    // instantiate the MutationObserver API
    const observer = new MutationObserver(() => {
      this._defineItems();

      // We use this if to don't
      // start this method again when
      // there is already one
      if (!this.onMutation) {
        this.onMutation = true;
        this._resizeAllGridItems(targetNode);
        this.onMutation = false;
      }
    });

    // mutation observer API configuration
    // https://developer.mozilla.org/fr/docs/Web/API/MutationObserver#MutationObserverInit
    const observerConfig = {
      attributes: false,
      childList: true,
      subtree: true,
      characterData: true
    };

    observer.observe(targetNode, observerConfig);
  }
}

customElements.define('bux-layout', Layout);
