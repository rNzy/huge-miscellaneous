import BuxClass from '../../../../bux.class';

import createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

import './sitemap.styles.scss';

customElements.define(
  'bux-sitemap',
  class Sitemap extends BuxClass {
    constructor() {
      super();
      this.isInit = false;

      // How many menu to create
      this.arrMenu = [];

      // Object that will contains tags
      this.tags = {};

      this.els = {};

      this.elsActive = {};
      this.elsUnActive = {};

      this.first = true;
    }

    get data() {
      return this._data;
    }

    set data(newVal) {
      this._data = newVal;
      if (!this.isInit) return;
      this.init();
    }

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      // Set HTML
      this.innerHTML = `
      <div id="sitemapinputwrap">
        <bux-input data-icon-left="loupe" data-list="sitemapdatalist" data-placeholder="Recherche une fonctionnalité" id="sitemapinput"></bux-input>
        <datalist id="sitemapdatalist"></datalist>
        <bux-btn id="sitemapbtn">Rechercher</bux-btn>
      </div>
      <bux-block id="sitemapblock"></bux-block>
      <bux-end-process id="sitemapblockerror"
        data-icon="loupe"
        autofocus="false"
        style="display:none;"
      >
      </bux-end-process>
    `;

      // Select Elements
      this.block = this.querySelector('#sitemapblock');
      this.input = this.querySelector('#sitemapinput');
      this.btn = this.querySelector('#sitemapbtn');
      this.datalist = this.querySelector('#sitemapdatalist');

      if (this.hasAttribute('nosearch')) {
        const inputWrap = this.querySelector('#sitemapinputwrap');
        inputWrap.style.display = 'none';
        const blockError = this.querySelector('#sitemapblockerror');
        blockError.style.display = 'none';
      } else {
        // Listener to handle the search

        // Click on the search bouton
        this.btn.addEventListener('click', () =>
          this.toogleDisplay(this.input.value)
        );

        // Press enter inside the input
        this.input.addEventListener('keypress', e => {
          if (e.which == 13) this.btn.click();
          if (this.input.value === '') {
            this.input.setAttribute('data-icon-right', 'aaaaaa');
          } else {
            this.input.setAttribute('data-icon-right', 'cross');

            if (this.input.value) {
              this.input.value = ('' + this.input.value).toLowerCase();
            }

            // It's the first time that the cross appear add event to handle click on it
            if (this.first) {
              // Click on the reset bouton
              this.querySelector('.bux-input-ico-right').addEventListener(
                'click',
                () => {
                  this.input.value = '';
                  this.btn.click();
                  this.input.setAttribute('data-icon-right', 'aaaaaa');
                }
              );
              this.first = false;
            }
          }
        });
      }

      this.init();
    }

    /**
     * Display none all unselected
     * @param {string} val the input value
     * @returns {undefined}
     */
    toogleDisplay(val) {
      // The input val is empty
      // eslint-disable-next-line no-eq-null
      if (val === '' || val == null) {
        this.setError(false);
        this.removeActive();
        // The tag exists
      } else if (Object.prototype.hasOwnProperty.call(this.tags, val)) {
        this.setError(false);
        this.removeActive();
        this.fillActiveUnactiveEl(val);
        this.setActive();
        // The tag doesn't exists
      } else {
        this.setError(true);
        this.removeActive();
      }
      this.toggleEmptySiteMapBlock();
    }

    toggleEmptySiteMapBlock() {
      // For all #sitemapX
      this.arrMenu.forEach(val => {
        const sitemapArr = [...this['sitemap' + val].children];
        // Set empty class if all child are empty
        sitemapArr.forEach(sec => this.toggleEmptyBlock(sec));

        // Check if all children is unactive
        const allIsEmpty = sitemapArr.filter(
          el => !el.classList.contains('c-sitemap__unactive')
        );

        // If all children is unactive display none on the block.
        if (allIsEmpty.length === 0) {
          this['sitemap' + val].classList.add('c-sitemap__unactive');
        } else {
          this['sitemap' + val].classList.remove('c-sitemap__unactive');
        }
      });

      for (let ii = this.arrMenu.length; ii > 0; ii--) {
        const val = this.arrMenu[ii - 1];
        if (!this['sitemap' + val].classList.contains('c-sitemap__unactive')) {
          this['sitemap' + val].classList.add(
            'c-sitemap-item-wrap__last-visible'
          );
          break;
        }
      }
    }

    toggleEmptyBlock(sec) {
      const allLi = [...sec.querySelectorAll('.c-sitemap-item-li')];

      if (allLi.length === 0) return;

      const allIsEmpty = allLi.filter(
        el => !el.classList.contains('c-sitemap__unactive')
      );

      // If all children is unactive display none on the block.
      if (allIsEmpty.length === 0) {
        sec.classList.add('c-sitemap__unactive');
      } else {
        sec.classList.remove('c-sitemap__unactive');
      }
    }

    fillActiveUnactiveEl(val) {
      Object.keys(this.tags).forEach(key => {
        const tag = this.tags[key];
        // Fill active
        if (key === val) {
          tag.forEach(selector => {
            if (this.els[selector])
              this.elsActive[selector] = this.els[selector];
          });
          // Fill unactive
        } else {
          tag.forEach(selector => {
            if (this.els[selector])
              this.elsUnActive[selector] = this.els[selector];
          });
        }
      });

      // Remove all fill active in unactive
      Object.keys(this.elsUnActive).forEach(elUnActiveKey => {
        Object.keys(this.elsActive).forEach(elActiveKey => {
          if (elUnActiveKey === elActiveKey)
            delete this.elsUnActive[elActiveKey];
        });
      });
    }

    removeActive() {
      // Remove active class
      Object.keys(this.elsActive).forEach(key => {
        this.elsActive[key].classList.remove('c-sitemap__active');
      });
      this.elsActive = {};

      // Remove unactive class
      Object.keys(this.elsUnActive).forEach(key => {
        this.elsUnActive[key].classList.remove('c-sitemap__unactive');
      });
      this.elsUnActive = {};
    }

    setActive() {
      // Add active class
      Object.keys(this.elsActive).forEach(key => {
        this.elsActive[key].classList.add('c-sitemap__active');
      });

      // Add unactive class
      Object.keys(this.elsUnActive).forEach(key => {
        this.elsUnActive[key].classList.add('c-sitemap__unactive');
      });
    }

    /**
     * Get all Dom Elements for the this.els
     * @returns {undefined}
     */
    getAllEl() {
      Object.keys(this.els).forEach(key => {
        this.els[key] = this.querySelector('#' + key);
      });
    }

    /**
     * Get One Dom Element for the path
     * @param {string} path the path
     * @returns {undefined}
     */
    getEl(path) {
      const el = this.querySelector('#' + path);
      return el;
    }

    /**
     * Init the component with the data
     * @returns {undefined}
     */
    init() {
      if (!this._data) return;
      // Split data by menu
      this.splitData();

      // Fill the tags object
      this.makeTagsObject();

      // Fill the datalist dom element
      this.fillDataList();

      // Create the Html for all menu
      this.createHTML();

      this.getAllEl();

      this.toogleDisplay();
    }

    fillDataList() {
      Object.keys(this.tags).forEach(key => {
        if (key === 'notag' || key === '') return;
        const opt = document.createElement('option');
        opt.value = key;
        this.datalist.appendChild(opt);
      });
    }

    /**
     * Split the data for different menu
     * @returns {undefined}
     */
    splitData() {
      this._data.forEach(item => {
        //
        if (typeof this['dataMenu' + item.menu] === 'undefined') {
          this.arrMenu.push(item.menu);

          const tpl = document.createElement('div');
          tpl.id = 'sitemap' + item.menu;
          tpl.classList.add('c-sitemap-item-wrap');
          this['sitemap' + item.menu] = tpl;
          this.block.appendChild(tpl);

          this['dataMenu' + item.menu] = [];
        }

        this['dataMenu' + item.menu].push(item);
      });
    }

    /**
     * Make the HTML for all group
     * @returns {undefined}
     */
    createHTML() {
      // Loop throw menu bloc
      this.arrMenu.forEach(i => {
        this['sitemap' + i].innerHTML = this.makeOneGroup(
          this['dataMenu' + i],
          'dataMenu' + i
        );
      });
    }

    /**
     * Make the HTML for one group
     * @param {Array} group the this.dataMenu data
     * @param {string} path the path for finding data
     * @returns {undefined}
     */
    makeOneGroup(group, path) {
      let tpl = '';
      group.forEach((subgroup, i) => {
        const idPath = path + '-' + i;
        this.els[idPath] = null;

        tpl += `
        <section id="${idPath}" class="c-sitemap-item-section"><div class="c-sitemap-item-div">
          ${
            subgroup.path
              ? `
                  <a href="${subgroup.path}" class="c-sitemap-item-header">
                  ${
                    subgroup.icon
                      ? `<bux-svg data-icon=${subgroup.icon} data-class="c-sitemap-item-header-icon"></bux-svg>`
                      : ''
                  }
                    <span class="c-sitemap-item-label-wrap">${
                      subgroup.label
                    }</span>
                    <bux-svg data-icon="arrow" data-class="c-sitemap-chevron">
                </a>
                ${this.makeChildrenItem(subgroup, idPath)}
              `
              : `
                  <div class="c-sitemap-item-header">
                  ${
                    subgroup.icon
                      ? `<bux-svg data-icon=${subgroup.icon} data-class="c-sitemap-item-header-icon"></bux-svg>`
                      : ''
                  }
                    <span class="">${subgroup.label}</span>
                </div>
                ${this.makeChildrenItem(subgroup, idPath)}
              `
          }
        </div></section>
        `;
      });
      return tpl;
    }

    /**
     * Make the HTML for one group
     * @param {Array} item the subitem of this.dataMenu data
     * @param {string} path the path for finding data
     * @returns {undefined}
     */
    makeChildrenItem(item, path) {
      let tpl = '';
      let idPath = path;
      if (item.submenu) {
        idPath = path + '-submenu';
        tpl += '<ul class="u-list c-sitemap-item-ul">';
        item.submenu.forEach((subitem, i) => {
          const link = subitem.path || subitem.navtop[0].path;
          this.els[idPath + '-' + i] = null;
          tpl += `
          <li id="${idPath}-${i}" class="c-sitemap-item-li">
            <a class="c-sitemap-item-a" href="${link}">
              <div class="c-sitemap-item-label-wrap">
                <span class="c-sitemap-item-label">${subitem.label}</span>
                ${
                  subitem.sublabel
                    ? `<span class="c-sitemap-item-sublabel">${subitem.sublabel}</span>`
                    : ''
                }
              </div>
              <bux-svg data-icon="arrow" data-class="c-sitemap-chevron">
            </a>
          </li>`;
        });
        tpl += '</ul>';
      }
      if (item.navtop) {
        idPath = path + '-navtop';
        tpl += '<ul class="u-list c-sitemap-item-ul">';
        item.navtop.forEach((subitem, i) => {
          const link = subitem.path || subitem.navtop[0].path;
          this.els[idPath + '-' + i] = null;
          tpl += `
          <li id="${idPath}-${i}" class="c-sitemap-item-li">
            <a class="c-sitemap-item-a" href="${link}">
              <div class="c-sitemap-item-label-wrap">
                <span class="c-sitemap-item-label">${subitem.label}</span>
                ${
                  subitem.sublabel
                    ? `<span class="c-sitemap-item-sublabel">${subitem.sublabel}</span>`
                    : ''
                }
              </div>
              <bux-svg data-icon="arrow" data-class="c-sitemap-chevron">
            </a>
          </li>`;
        });
        tpl += '</ul>';
      }
      return tpl;
    }

    /**
     * Fill the tags object with this.dataMenu entries.
     * At the end this.tags must look like = {
     *  'comptes': ['path1-to-module','path2-to-module'],
     *  ....
     *  'beneficiaire': ['path1-to-module','path2-to-module']
     * }
     * @returns {undefined}
     */
    makeTagsObject() {
      const myloop = path => arr => {
        const level = path.split('-').length;

        arr.forEach((val, i) => {
          let enter = false;
          if (val.tags) {
            enter = true;
            val.tags.forEach(tag => {
              if (!Object.prototype.hasOwnProperty.call(this.tags, tag))
                this.tags[tag] = [];
              this.tags[tag].push(`${path}-${i}`);
            });
          }

          if (val.submenu) {
            enter = true;
            myloop(`${path}-${i}-submenu`)(val.submenu);
          }

          if (val.navtop) {
            enter = true;
            myloop(`${path}-${i}-navtop`)(val.navtop);
          }

          if (!enter || (level >= 3 && !val.tags)) {
            if (!Object.prototype.hasOwnProperty.call(this.tags, 'notag'))
              this.tags.notag = [];
            this.tags.notag.push(`${path}-${i}`);
          }
        });
      };

      this.tags[''] = [];

      // Loop throw menu bloc
      this.arrMenu.forEach(indexDataMenu => {
        myloop(`dataMenu${indexDataMenu}`)(this['dataMenu' + indexDataMenu]);
      });
    }

    /**
     * Display Error message 'Function not found'
     * @param {boolean} state display or not
     * @return {undefined}
     */
    setError(state) {
      const errorEl = this.querySelector('#sitemapblockerror');
      const mapEl = this.querySelector('#sitemapblock');

      if (state) {
        errorEl.setAttribute(
          'data-html',
          `<p>Nous n'avons pas trouvé de fonctionnalité correspondant à la recherche<br/>
            <strong>"${DOMPurify.sanitize(this.input.value, {
              ALLOWED_TAGS: ['#text'],
              KEEP_CONTENT: false
            })}"
            </strong>
          </p>
      <bux-message type="info"><p>Vérifiez l'orthographe ou relancer une recherche avec de nouveaux termes</p></bux-message>
      `
        );
        errorEl.style.display = '';
        mapEl.style.display = 'none';
      } else {
        errorEl.style.display = 'none';
        mapEl.style.display = '';
      }
    }
  }
);
