import BuxClass from '../../../../bux.class';

customElements.define(
  'bux-nav-bar-item',
  class NavBarItem extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();
      this.isInit = false;
      this.active = false;

      // Bind your event Here
      // this.clickEventHandler = this.clickEvent.bind(this);
      this.transitionendEventHandler = this.transitionendEvent.bind(this);

      this.idPrefixe =
        'bux-nav-bar-item-' + (Math.floor(Math.random() * 10000) + 2);
    }
    //////////////////////////

    //////////////// Attribute change
    static get observedAttributes() {
      return ['active'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      this[name] = newVal;
      if (!this.isInit) return;
      this.setActif();
      this.setCurrentPage();
    }

    setActif() {
      if ('true' == this.active) {
        this.wrap.classList.add('is-active');
        this.wrap.children[0].classList.add('is-active');
        this.expandSection();
      } else {
        this.wrap.classList.remove('is-active');
        this.wrap.children[0].classList.remove('is-active');
        this.collapseSection();
      }
    }

    setCurrentPage() {
      if (this.anchor) {
        if ('true' == this.active) {
          this.anchor.setAttribute('aria-current', 'page');
        } else {
          this.anchor.removeAttribute('aria-current');
        }
      }
    }

    connectedCallback() {
      if (this.isInit) return;

      this.haveSlot = this.childNodes.length > 0;

      this.path = this.getAttribute('data-path') || false;
      this.label = this.getAttribute('data-label');
      this.sublabel = this.getAttribute('data-sublabel');
      this.badge1 = this.getAttribute('data-badge-1');
      this.badge2 = this.getAttribute('data-badge-2');
      this.icon = this.getAttribute('data-icon');
      this.a11yLabel = this.getAttribute('a11y-label');
      this.identifier = this.getAttribute('data-identifier') || null;
      this.type = this.getAttribute('type') || 'link';
      this.externalLink =
        this.hasAttribute('externalLink') &&
        this.getAttribute('externalLink') != 'false';

      const tpl = document.createElement('template');

      if (this.haveSlot) {
        tpl.innerHTML = this.templateSlot();

        this.btn = tpl.content.querySelector('.c-nav-bar-item--btn');
        this.cont = tpl.content.querySelector('.c-nav-bar-item--cont');

        while (this.childNodes.length > 0) {
          this.cont.appendChild(this.childNodes[0]);
        }
      } else {
        tpl.innerHTML = this.templateWithoutSlot();
      }

      this.wrap = tpl.content.querySelector('.c-nav__item');

      this.setActif();

      this.anchor = tpl.content.querySelector('a');
      this.setCurrentPage();

      this.appendChild(tpl.content);

      this.isInit = true;

      this.dispatchEvent(
        new CustomEvent('mount', {
          bubbles: true,
          cancelable: false,
          detail: {
            identifier: this.identifier
          }
        })
      );
    }

    collapseSection() {
      if (!this.haveSlot) return;

      this.btn.setAttribute('aria-expanded', 'false');

      // Get actual height
      const sectionHeight = this.cont.scrollHeight;

      // Disable css transitions
      const elmTransition = this.cont.style.transition;
      this.cont.style.transition = '';

      // on the next frame (as soon as the previous style change has taken effect),
      // explicitly set the element's height to its current pixel height, so we
      // aren't transitioning out of 'auto'
      requestAnimationFrame(() => {
        this.cont.style.height = sectionHeight + 'px';
        this.cont.style.transition = elmTransition;

        // on the next frame (as soon as the previous style change has taken effect),
        // have the element transition to height: 0
        requestAnimationFrame(() => {
          this.cont.style.height = 0 + 'px';
          this.cont.setAttribute('aria-hidden', 'true');
          this.cont.style.visibility = 'hidden'; // aria-hidden is not enought you can still focus on inside element
        });
      });
    }

    expandSection() {
      if (!this.haveSlot) return;

      this.btn.setAttribute('aria-expanded', 'true');

      // Get actual height
      const sectionHeight = this.cont.scrollHeight;

      // have the element transition to the height of its inner content
      this.cont.style.height = sectionHeight + 'px';

      // when the next css transition finishes (which should be the one we just triggered)
      this.cont.addEventListener(
        'transitionend',
        this.transitionendEventHandler
      );
    }

    transitionendEvent() {
      // Remove this listener
      this.cont.removeEventListener(
        'transitionend',
        this.transitionendEventHandler
      );
      // remove "height" from the element's inline styles, so it can return to its initial value
      this.cont.style.height = null;
      this.cont.setAttribute('aria-hidden', 'false');
      this.cont.style.visibility = ''; // aria-hidden is not enought you can still focus on inside element
    }

    templateSlot() {
      return `
        <div class="c-nav__item">
          <button
          aria-controls="${this.idPrefixe}"
          class="c-nav-bar-item--btn c-nav-bar-item--btn-chevron"
          aria-expanded="true"
          ${this.identifier ? `id="${this.identifier}"` : ''}
          >
          ${this.templateIcon()}
          ${this.templateLabel()}
          ${this.templateSubLabel()}
          </button>
          <div class="c-nav-bar-item--cont" id="${this.idPrefixe}"></div>
        </div>
      `;
    }

    templateWithoutSlot() {
      if (this.type === 'button') {
        return this.templateBtn();
      } else if (this.path) {
        return this.templateA();
      }
      return this.templateDiv();
    }

    templateIcon() {
      if (this.icon) {
        return `<bux-svg data-icon="${
          this.icon
        }" data-class="c-icon c-nav__icon"></bux-svg>`;
      }
      return '';
    }

    templateLabel() {
      return `
        <span class="c-nav__item-label-wrap">
            ${
              this.label
                ? `<span class="c-nav__item-label">${this.label}</span>`
                : ''
            }
            ${
              this.badge1
                ? `<span class="c-nav__item-label-badge c-nav__item-label-badge1">${
                    this.badge1
                  }</span>`
                : ''
            }
            ${
              this.badge2
                ? `<span class="c-nav__item-label-badge c-nav__item-label-badge2">${
                    this.badge2
                  }</span>`
                : ''
            }
        </span>`;
    }

    templateSubLabel() {
      return `
        ${
          this.sublabel
            ? `
          <small class="c-nav-link__sublabel">${this.sublabel}</small>
          `
            : ''
        }`;
    }

    templateBtn() {
      return `
        <div class="c-nav__item">
          <button class="nav-bar-item-a nav-bar-item-a-btn"
          ${this.a11yLabel ? `aria-label="${this.a11yLabel}"` : ''}
          ${this.identifier ? `id="${this.identifier}"` : ''}
          >
          ${this.templateIcon()}
          ${this.templateLabel()}
          ${this.templateSubLabel()}
          </button>
        </div>
      `;
    }

    templateA() {
      return `
        <div class="c-nav__item">
          <a class="nav-bar-item-a" href="${this.path}"
            ${this.externalLink ? 'target="_blank" rel="noopener"' : ''}
            ${this.a11yLabel ? `aria-label="${this.a11yLabel}"` : ''}
            ${this.identifier ? `id="${this.identifier}"` : ''}
            >
            ${this.templateIcon()}
            ${this.templateLabel()}
            ${this.templateSubLabel()}
          </a>
        </div>
      `;
    }

    templateDiv() {
      return `
          <div class="c-nav__item">
            <div class="nav-bar-item-div"
              ${this.a11yLabel ? `aria-label="${this.a11yLabel}"` : ''}
              ${this.identifier ? `id="${this.identifier}"` : ''}
              >
              ${this.templateIcon()}
              ${this.templateLabel()}
              ${this.templateSubLabel()}
              </div>
          </div>
        `;
    }
  }
);
