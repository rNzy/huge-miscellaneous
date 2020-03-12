import './tabs.styles.scss';

// cf. https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html
// cf. https://simplyaccessible.com/article/danger-aria-tabs/

customElements.define(
  'bux-tabs',
  class Tabs extends HTMLElement {
    ////////////////////// Constructor
    constructor() {
      super();

      this.handleTabClickEvent = this.tabClickEvent.bind(this);
      this.handleTabKeyDownEvent = this.tabKeyDownEvent.bind(this);
      this.handleTabFocusEvent = this.tabFocusEvent.bind(this);

      this.idPrefixe = 'bux-tabs-' + (Math.floor(Math.random() * 10000) + 2);

      this.isInit = false;
      this.isEventRemove = false;

      // For easy reference
      this.keys = {
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        delete: 46
      };
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['tabactive'];
    }

    attributeChangedCallback(name, oldVal, newValue) {
      if (!this.isInit) return;
      this.switchTab(newValue);
    }

    get tabactive() {
      return this._tabactive;
    }

    set tabactive(newVal) {
      this.setAttribute('tabactive', newVal);
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      this.neutralStart =
        this.hasAttribute('neutral-start') &&
        this.getAttribute('neutral-start') !== 'false';

      if (this.neutralStart === true) {
        this._tabactive = null;
        this.setAttribute('tabactive', 'null');
      } else {
        if (this.hasAttribute('tabactive')) {
          this._tabactive = this.getAttribute('tabactive');
        } else {
          this._tabactive = 0;
        }
        this.setAttribute('tabactive', '0');
      }

      if (this.isInit && this.isEventRemove) this.addEvents();
      if (this.isInit) return;
      this.isInit = true;

      this.type = this.getAttribute('type') || 'default';
      this.noshadow =
        this.hasAttribute('noshadow') &&
        this.getAttribute('noshadow') !== 'false';
      this.nocontainer =
        this.hasAttribute('nocontainer') &&
        this.getAttribute('nocontainer') !== 'false';

      this.label = this.getAttribute('data-label') || null;

      const tpl = document.createElement('template');

      if (this.type === 'default') {
        tpl.innerHTML = `
        <div class="c-tabs">
         <ul class="c-tabs__list" role="tablist"></ul>
         <div class="c-tabs__cont"></div>
        </div>
      `;
      } else {
        tpl.innerHTML = `
        <div class="c-tabs c-tabs-dropdown">
          ${this.label ? `<span>${this.label}</span>` : ''}
         <ul class="c-tabs__list c-tabs__list-dropdown" role="tablist"></ul>
         <div class="c-tabs__cont c-tabs__cont-dropdown"></div>
        </div>
      `;
      }

      if (this.noshadow) {
        tpl.content.querySelector('.c-tabs').classList.add('c-tabs--noshadow');
      }

      this.tablist = tpl.content.querySelector('.c-tabs__list');
      this.cont = tpl.content.querySelector('.c-tabs__cont');

      // Add slot
      const slots = this.querySelectorAll('.c-tabs__data');
      const slotsLenght = slots.length - 1;

      slots.forEach((slot, i) => {
        this.makeOneEl(slot, i, i === 0, i === slotsLenght, slotsLenght);
      });

      // Render it
      this.appendChild(tpl.content);

      // Select
      this.tabs = this.tablist.querySelectorAll('a');
      this.tabactiveElm = this.tabs[this._tabactive];
      this.panels = this.cont.querySelectorAll('.c-tabs__panel');

      // Add event
      this.addEvents();
    }

    disconnectedCallback() {
      this.removeEvent();
    }

    // Tab Click Event
    tabClickEvent(e) {
      e.preventDefault();
      this.switchTab(e.currentTarget);
    }

    tabFocusEvent(e) {
      if (
        e.target &&
        e.target.tagName === 'A' &&
        !e.target.classList.contains('is-active')
      ) {
        this.switchTab(e.target, false);
      }
    }

    tabKeyDownEvent(e) {
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir = null;

      switch (e.which) {
        case this.keys.end:
          event.preventDefault();
          // Activate last tab
          this.switchTab(this.tabs.length - 1);
          break;
        case this.keys.home:
          event.preventDefault();
          // Activate first tab
          this.switchTab(0);
          break;
        case this.keys.left:
          if (this._tabactive === 0) {
            dir = this.tabs.length - 1;
          } else {
            dir = this._tabactive - 1;
          }
          e.preventDefault();
          if (this.tabs[dir]) {
            this.switchTab(this.tabs[dir]);
          }
          break;
        case this.keys.right:
          if (this._tabactive >= this.tabs.length - 1) {
            dir = 0;
          } else {
            dir = this._tabactive + 1;
          }
          e.preventDefault();
          if (this.tabs[dir]) {
            this.switchTab(this.tabs[dir]);
          }
          break;
      }
    }

    // Add event
    addEvents() {
      this.tabs.forEach(tab => {
        // Handle clicking of tabs for mouse users
        tab.addEventListener('click', this.handleTabClickEvent);

        // Handle keydown events for keyboard users
        tab.addEventListener('keydown', this.handleTabKeyDownEvent);

        tab.addEventListener('focus', this.handleTabFocusEvent);
      });
      this.isEventRemove = false;
    }

    removeEvent() {
      this.tabs.forEach(tab => {
        // Handle clicking of tabs for mouse users
        tab.removeEventListener('click', this.handleTabClickEvent);

        // Handle keydown events for keyboard users
        tab.removeEventListener('keydown', this.handleTabKeyDownEvent);

        tab.removeEventListener('focus', this.handleTabFocusEvent);
      });
      this.isEventRemove = true;
    }

    getNewsTabEl(newTab) {
      let newTabElm = null;
      let newTabIndex = -1;

      // If newTab is a number or string
      if (typeof newTab === 'string' || typeof newTab === 'number') {
        if (this.tabs[newTab]) {
          newTabElm = this.tabs[newTab];
          newTabIndex = newTab;
        }
        // If newTab is dom Elm
      } else {
        const newTabIndexTmp = [...this.tabs].indexOf(newTab);
        if (newTabIndexTmp !== -1) {
          newTabElm = newTab;
          newTabIndex = newTabIndexTmp;
        }
      }

      return {
        newTabElm,
        newTabIndex
      };
    }

    // Change Tab
    // newTab could be a dom Elm or the table number
    switchTab(newTab, setFocus = true) {
      // Find new index and element of new selected tab
      const { newTabElm, newTabIndex } = this.getNewsTabEl(newTab);

      if (newTabElm === null) {
        if (this.tabactiveElm) {
          // this.tabactiveElm.removeAttribute('aria-selected');
          this.tabactiveElm.setAttribute('tabindex', '-1');
          this.tabactiveElm.classList.remove('is-active');
          this.tabactiveElm.parentElement.classList.remove('is-active');
        }
        if (this.panels[this._tabactive]) {
          this.panels[this._tabactive].hidden = true;
          this.panels[this._tabactive].classList.remove('is-active');
        }

        this._tabactive = null;
        this.tabactiveElm = null;
        return false;
      }

      // Check if oldTab is different than New Tab
      if (newTabElm === this.tabactiveElm) return false;

      newTabElm.setAttribute('tabindex', '0');
      newTabElm.setAttribute('aria-selected', 'true');
      newTabElm.classList.add('is-active');
      newTabElm.parentElement.classList.add('is-active');

      if (this._tabactive !== null && this.tabactiveElm !== null) {
        this.tabactiveElm.removeAttribute('aria-selected');
        this.tabactiveElm.setAttribute('tabindex', '-1');
        this.tabactiveElm.classList.remove('is-active');
        this.tabactiveElm.parentElement.classList.remove('is-active');

        // Get the indices of the new and old tabs to find the correct
        // tab panels to show and hide
        this.panels[this._tabactive].hidden = true;
        this.panels[this._tabactive].classList.remove('is-active');
      }

      this.panels[newTabIndex].hidden = false;
      this.panels[newTabIndex].classList.add('is-active');

      this._tabactive = newTabIndex;
      this.tabactiveElm = newTabElm;

      this.setAttribute('tabactive', this._tabactive);

      if (document.activeElement !== newTabElm && setFocus) newTabElm.focus();
      return true;
    }

    makeOneEl(el, i, first = false, last = false, slotsLenght) {
      // Create li element and add it to ul
      this.tablist.appendChild(this.makeLi(el, i, first, last));

      // Create section, add given element by slot to it
      // add it in div class="c-tabs__cont"
      this.cont.appendChild(this.makeSection(el, i, first, last, slotsLenght));
    }

    makeLi(el, i, first = false, last = false) {
      const tpl = document.createElement('template');
      let icon = el.getAttribute('data-icon');
      if( icon && icon !=='null') {
        icon = `<bux-svg data-icon="${icon}" data-class="c-icon"></bux-svg>`
      } else {
        icon = ""; // reset
      }

      tpl.innerHTML = `
        <li
          role="presentation"
          class="c-tabs__item ${i == this._tabactive ? 'is-active' : ''} ${
        first ? 'c-tabs__item-first' : ''
      } ${last ? 'c-tabs__item-last' : ''}"
        >
          <a
            id="${this.idPrefixe}_${i}"
            href="#section_${this.idPrefixe}_${i}"
            role="tab"
            tabindex="${i == this._tabactive ? '0' : '-1'}"
            aria-selected="${i == this._tabactive}"
            class="${i == this._tabactive ? 'is-active' : ''}">
              ${icon}
              <span>${el.title}</span>
          </a>
        </li>
      `;

      return tpl.content;
    }

    makeSection(el, i, first = false, last = false, slotsLenght) {
      const tpl = document.createElement('template');
      tpl.innerHTML = `
        <section
          id="section_${this.idPrefixe}_${i}"
          role="tabpanel"
          aria-labelledby="${this.idPrefixe}_${i}"
          tabindex="0"
          class="c-tabs__panel ${first ? 'c-tabs__panel-first' : ''} ${
        last ? 'c-tabs__panel-last' : ''
      }"
          ${i == this._tabactive ? '' : 'hidden'}
        >
        </section>
      `;

      if (this.type === 'dropdown' && !this.nocontainer) {
        const tplD = document.createElement('bux-container');
        tplD.setAttribute('type', `dropdown-${i + 1}${slotsLenght + 1}`);
        tplD.appendChild(el);
        tpl.content.querySelector('section').appendChild(tplD);
      } else {
        tpl.content.querySelector('section').appendChild(el);
      }

      return tpl.content;
    }



  }
);
