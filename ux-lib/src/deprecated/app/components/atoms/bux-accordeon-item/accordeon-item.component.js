import BuxClass from '../../../../bux.class';
import './accordeon-item.styles.scss';

// import '../bux-heading/heading.component';

customElements.define(
  'bux-accordeon-item',
  class AccordeonItemClass extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
      this.isEventRemove = false;
      this.idPrefixe =
        'bux-accordeon-item-' + (Math.floor(Math.random() * 10000) + 2);

      // Bind your event Here
      this.clickEventHandler = this.clickEvent.bind(this);
      this.tabKeyDownEventHandler = this.tabKeyDownEvent.bind(this);
      this.transitionendEventHandler = this.transitionendEvent.bind(this);
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['expanded', 'data-label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelCaseName = this.toCamelCase(name);
      this[camelCaseName] = newVal;

      if (!this.isInit) return;

      switch (camelCaseName) {
        case 'expanded':
          if (this.expanded) {
            this.expandSection();
          } else {
            this.collapseSection();
          }
          break;
        case 'label':
          this.reRenderHeading();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit && this.isEventRemove) this.addEvents();
      if (this.isInit) return;
      this.isInit = true;

      this.label = this.getAttribute('data-label') || '';
      this.icon = this.getAttribute('data-icon') || '';
      this.expanded =
        this.hasAttribute('expanded') &&
        this.getAttribute('expanded') !== 'false';

      this.level = this.getAttribute('data-level') || '2';

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      this.btn = tpl.content.querySelector('bux-heading');

      // Insert slot in previous selected element
      this.cont = tpl.content.querySelector('.bux-accordeon-cont');
      while (this.childNodes.length > 0) {
        this.cont.appendChild(this.childNodes[0]);
      }

      // Add event
      this.addEvents();

      // Insert your element in the dom
      this.appendChild(tpl.content);

      if (!this.expanded) this.collapseSectionWithoutTransition();
    }

    reRenderHeading() {
      this.removeEvents();
      this.btn.remove();
      const newNode = document.createElement('template');
      newNode.innerHTML = this.setHeadingHTML();
      this.btn = newNode.content.querySelector('bux-heading');
      this.insertBefore(newNode.content, this.cont);
      this.addEvents();
    }

    addEvents() {
      this.btn.addEventListener('click', this.clickEventHandler);
      this.btn.addEventListener('keydown', this.tabKeyDownEventHandler);
      this.isEventRemove = false;
    }

    removeEvents() {
      this.btn.removeEventListener('click', this.clickEventHandler);
      this.btn.removeEventListener('keydown', this.tabKeyDownEventHandler);
      this.isEventRemove = true;
    }

    // Component is unmount
    disconnectedCallback() {
      this.removeEvents();
    }

    // Event
    clickEvent() {
      if (this.btn.getAttribute('a11y-expanded') === 'true') {
        this.collapseSection();
      } else {
        this.expandSection();
      }
    }

    // @todo improve this
    tabKeyDownEvent(e) {
      switch (e.which) {
        case 13: // enter
        case 32: // space
        case 37: // left
        case 109: // -
        case 54: // -
        case 39: // right
        case 187: // -
        case 107: // -
          e.preventDefault();
          this.clickEventHandler();
          break;
      }
    }

    collapseSection() {
      this.btn.setAttribute('a11y-expanded', 'false');

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
        });
      });
    }

    collapseSectionWithoutTransition() {
      this.btn.setAttribute('a11y-expanded', 'false');
      this.cont.style.transition = '';
      this.cont.style.height = 0 + 'px';
      this.cont.setAttribute('aria-hidden', 'true');
    }

    expandSection() {
      this.btn.setAttribute('a11y-expanded', 'true');

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
    }

    setHeadingHTML() {
      return `<bux-heading
          data-level="${this.level}" 
          type="dropdown" 
          a11y-expanded="true" 
          a11y-controls="${this.idPrefixe}"
           ${this.icon === '' ? '' : `data-icon="${this.icon}"`}
         >${this.label}</bux-heading>`;
    }

    template() {
      return (
        this.setHeadingHTML() +
        `<div class="bux-accordeon-cont" id="${this.idPrefixe}"></div>`
      );
    }
  }
);
