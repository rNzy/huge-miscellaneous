import BuxClass from '../../../../bux.class';
import './nav-bar.styles.scss';

// import '../bux-nav-bar-item/nav-bar-item.component';

customElements.define(
  'bux-nav-bar',

  class NavBar extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();
      this.isInit = false;
      this.isDataSet = false;
      this.isEventRemove = false;
      this._data = null;
      this._dataOld = null;
      this.activeItem = null;
      this.activeItemIndex = null;
      this.eventFunct = null;
    }

    get data() {
      return this._data;
    }

    // Compare old data and new data.
    // Don't check isActive
    checkIfDataChange(data1, data2) {
      if (!data1 || !data2) return false;

      if (data1.length !== data2.length) return false;

      let test = true;
      data1.some((data, i) => {
        if (
          data.label !== data2[i].label ||
          data.sublabel !== data2[i].sublabel ||
          data.path !== data2[i].path
        ) {
          test = false;
          return false;
        }
        return true;
      });

      return test;
    }

    resetComponent() {
      this.container.style.display = 'none';
      this.isDataSet = false;
      this.list.innerHTML = '';
    }

    set data(newVal) {
      this._dataOld = this._data;
      this._data = newVal;
      if (!this.isInit) return;

      // Data was already create
      // change active
      if (this.isDataSet) {
        if (!this._data) {
          this.resetComponent();
          return;
        }

        if (!this.checkIfDataChange(this._data, this._dataOld)) {
          this.resetComponent();
          this.setData();
          return;
        }

        const newActiveIndex = this.findActiveInData(this._data);
        // Check if is the same activeItem
        // If yes send data to the sub menu if necessary
        // else do nothing
        if (this.activeItemIndex === newActiveIndex) {
          if (
            this._data[this.activeItemIndex] &&
            this._data[this.activeItemIndex].submenu
          ) {
            const subMenu = this.activeItem.querySelector('bux-nav-bar');
            subMenu.data = this._data[this.activeItemIndex].submenu;
          }
          return;
        }
        this.removeActive();
        this.setActive(newActiveIndex);

        // Data was not create
      } else {
        this.setData();
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit && this.isEventRemove) this.addEvent();

      if (this.isInit) return;

      // Init
      this.type = this.getAttribute('type');

      this.noBorderBottom = this.hasAttribute('noborderbottom');

      // Create template
      const tpl = document.createElement('template');
      tpl.innerHTML = `
        <nav class="c-nav" role="navigation" style="display:none">
          <ul class="c-nav__list"></ul>
        </nav>`;

      // Selector
      this.container = tpl.content.querySelector('.c-nav');
      this.list = tpl.content.querySelector('.c-nav__list');

      // Create div for bubble effect
      if (this.hasAttribute('bubble-effect')) {
        const el = document.createElement('div');
        el.classList.add('elastic-element');
        this.elasticElement = el;
        this.container.appendChild(el);
        this.addEvent();
      }

      // Set style
      this.setStyle();

      // Create child element within the this._data
      this.setData();

      // Append to the dom
      this.appendChild(tpl.content);

      this.isInit = true;
    }

    // Find active item in data
    // return number
    // if not found return -1
    findActiveInData(data) {
      let i = 0;
      const l = data.length;
      for (; i < l; i++) {
        if (data[i].isActive) {
          return i;
        }
      }
      return -1;
    }

    // Set active item
    // param index number
    setActive(index) {
      if (index === -1) return;

      this.activeItem = this.items[index];
      this.activeItem.setAttribute('active', 'true');
      this.activeItemIndex = index;

      if (this.hasAttribute('bubble-effect')) {
        this.setPosAndWidthBubble();
      }

      // Active good child if necessary
      if (this._data[index].submenu) {
        const subMenu = this.activeItem.querySelector('bux-nav-bar');
        subMenu.data = this._data[index].submenu;
      }
    }

    // Remove active item
    // no param
    removeActive() {
      // Remove active of old active item
      if (this.activeItem) {
        this.activeItem.removeAttribute('active');

        // Active good child if necessary
        if (this._data[this.activeItemIndex].submenu) {
          const subMenu = this.activeItem.querySelector('bux-nav-bar');
          subMenu.data = this._data[this.activeItemIndex].submenu;
        }
      }

      this.activeItemIndex = -1;
      this.activeItem = null;
    }

    setData() {
      if (!this._data) return;

      this.container.removeAttribute('style');

      // Create child element within the this._data
      this.list.appendChild(this.fillData(this._data));

      // Get item
      this.items = this.list.querySelectorAll('bux-nav-bar-item');

      // Find and Set active
      this.setActive(this.findActiveInData(this._data));

      this.isDataSet = true;
    }

    // Create bux-nav-bar-item with this._data
    fillData(data) {
      const tpl = document.createElement('template').content;
      const length = data.length - 1;

      data.forEach((item, i) => {
        if (
          item.submenu &&
          (!Array.isArray(item.submenu) ||
            (Array.isArray(item.submenu) && item.submenu.length === 0))
        ) {
          delete item.submenu;
          delete data[i].submenu;
        }

        // If this item have a sub menu create
        // a new bux-nav-bar and is child
        if (item.submenu) {
          const li = this.renderOneItem(item, i === 0, i === length);

          const submenuTpl = document.createElement('bux-nav-bar');
          submenuTpl.setAttribute('type', 'primarysub');
          submenuTpl.data = item.submenu;

          li.children[0].appendChild(submenuTpl);
          tpl.appendChild(li);
          // Create only one item
        } else {
          tpl.appendChild(this.renderOneItem(item, i === 0, i === length));
        }
      });

      return tpl;
    }

    // Create one bux-nav-bar-item
    // @param item
    // @param last boolean
    renderOneItem(item, first = false, last = false) {
      const li = document.createElement('li');
      li.classList.add('c-nav__list-li');

      if (first) li.classList.add('c-nav__list-li--first');
      if (last) li.classList.add('c-nav__list-li--last');

      const itemTpl = document.createElement('bux-nav-bar-item');

      let path = '';
      if (item.path) {
        path = item.path
      } else if (item.navtop && item.navtop[0] && item.navtop[0].path) {
        path = item.navtop[0].path
      }

      itemTpl.setAttribute('data-path', path);
      if (item.type) itemTpl.setAttribute('type', item.type);
      if (item.icon) itemTpl.setAttribute('data-icon', item.icon);
      if (item.label) itemTpl.setAttribute('data-label', item.label);
      if (item.badge1) itemTpl.setAttribute('data-badge-1', item.badge1);
      if (item.badge2) itemTpl.setAttribute('data-badge-2', item.badge2);
      if (item.sublabel) itemTpl.setAttribute('data-sublabel', item.sublabel);
      if (item.a11yLabel) itemTpl.setAttribute('a11y-label', item.a11yLabel);
      if (item.isActive) itemTpl.setAttribute('active', 'true');
      if (item.externalLink) itemTpl.setAttribute('externalLink', 'true');
      if (item.identifier)
        itemTpl.setAttribute('data-identifier', item.identifier);

      li.appendChild(itemTpl);

      return li;
    }

    // Set good class
    setStyle() {
      switch (this.type) {
        case 'primary':
          this.container.classList.add('c-nav--primary');
          break;
        case 'primarysub':
          this.container.classList.add('c-nav--primary-sub');
          break;
        case 'secondary':
          this.container.classList.add('c-nav--secondary');
          break;
        case 'footer':
          this.container.classList.add('c-nav--footer');
          break;
        case 'footerauth':
          this.container.classList.add('c-nav--footer', 'c-nav--footer__auth');
          break;
        case 'footermobile':
          this.container.classList.add('c-nav--footermobile');
          break;
        case 'sociaux':
          this.container.classList.add('c-nav--sociaux');
          break;
      }

      if (this.noBorderBottom)
        this.container.classList.add('c-nav--noborderbottom');
    }

    toogleActive(newActiveItem) {
      if (this.activeItem) {
        this.activeItem.removeAttribute('active');
      }
      newActiveItem.setAttribute('active', 'true');
      this.activeItem = newActiveItem;
    }

    setCNavItem() {
      if (this.activeItem) {
        this.cNavActiveItem = this.activeItem.querySelector('.c-nav__item');
        return this.cNavActiveItem;
      }
      return null;
    }

    setPosAndWidthBubble() {
      if (this.setCNavItem()) {
        this.elasticElement.style.left = this.cNavActiveItem.offsetLeft + 'px';
        this.elasticElement.style.width =
          this.cNavActiveItem.offsetWidth + 'px';
      }
    }

    // Remove event when disconnected
    disconnectedCallback() {
      this.removeEvent();
    }

    // Add event
    addEvent() {
      // If add BubbleEffect
      if (this.hasAttribute('bubble-effect')) {
        // Add resize event to window
        this.eventFunct = this.resizeDebounce(() => {
          this.setPosAndWidthBubble();
        });

        window.addEventListener('resize', this.eventFunct);
        this.isEventRemove = false;
      }
    }

    removeEvent() {
      if (this.eventFunct) {
        window.removeEventListener('resize', this.eventFunct);
        this.isEventRemove = true;
      }
    }

    resizeDebounce(func) {
      let time = 0;
      return e => {
        if (time) clearTimeout(time);
        time = setTimeout(func, 100, e);
      };
    }
  }
);
