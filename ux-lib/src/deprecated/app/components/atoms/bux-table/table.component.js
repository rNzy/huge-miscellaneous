import BuxClass from '../../../../bux.class';
import './table.styles.scss';

customElements.define(
  'bux-table',
  class Table extends BuxClass {
    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'data-label-header',
        'data-title-footer',
        'data-label-footer',
        'data-link-footer'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelCaseName = this.toCamelCase(name);
      this[camelCaseName] = newVal;
      if (!this.isInit) return;
      switch (camelCaseName) {
        case 'labelHeader':
          this.setLabelHeader();
          break;
        case 'titleFooter':
          this.setTitleFooter();
          break;
        case 'labelFooter':
          this.setLabelFooter();
          break;
        case 'linkFooter':
          this.setLinkFooter();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;

      this.labelHeader = this.getAttribute('data-label-header');
      this.titleFooter = this.getAttribute('data-title-footer');
      this.labelFooter = this.getAttribute('data-label-footer');
      this.linkFooter = this.getAttribute('data-link-footer');

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Here you can select element
      const wrapSlot = tpl.content.querySelector('.c-table__container');

      while (this.childNodes.length > 0) {
        wrapSlot.appendChild(this.childNodes[0]);
      }

      this.appendChild(tpl.content);

      this.setLabelHeader();
      this.setTitleFooter();
      this.setLabelFooter();
      this.setLinkFooter();

      this.isInit = true;
    }

    setLabelHeader() {
      const headerEl = this.querySelector('.c-table__header');
      if (this.labelHeader) {
        headerEl.innerHTML = this.labelHeader;
        headerEl.style.display = '';
      } else {
        headerEl.style.display = 'none';
      }
    }

    setTitleFooter() {
      const titleEl = this.querySelector('.c-table__footer-title');
      if (this.titleFooter) {
        titleEl.innerHTML = this.titleFooter;
        titleEl.style.display = '';
      } else {
        titleEl.style.display = 'none';
      }
      this.displayOrNotFooter();
    }

    setLabelFooter() {
      const labelEl = this.querySelector('.c-table__footer-label');
      if (this.labelFooter) {
        labelEl.innerHTML = this.labelFooter;
        labelEl.style.display = '';
      } else {
        labelEl.style.display = 'none';
      }
      this.displayOrNotFooter();
    }

    setLinkFooter() {
      const linkEl = this.querySelector('.c-table__footer-link');
      if (this.linkFooter) {
        linkEl.innerHTML = `
        <bux-svg data-icon="arrow" data-class="c-svg c-table__footer-arrow"></bux-svg>
        <a class="c-table__footer-anchor" href="${this.linkFooter}" title="Aller vers la page"><a>
        `;
        linkEl.style.display = '';
      } else {
        linkEl.style.display = 'none';
      }
      this.displayOrNotFooter();
    }

    displayOrNotFooter() {
      const footerEl = this.querySelector('.c-table__footer');
      if (this.titleFooter || this.labelFooter || this.linkFooter) {
        footerEl.style.display = '';
      } else {
        footerEl.style.display = 'none';
      }
    }

    template() {
      return `
        <div class="c-table">
          <div class="c-table__header"></div>
          <div class="c-table__container"></div>
          <div class="c-table__footer">
              <div class="c-table__footer-title"></div>
              <div class="c-table__footer-label"></div>
              <div class="c-table__footer-link"></div>
            </div>
        </div>`;
    }
  }
);
