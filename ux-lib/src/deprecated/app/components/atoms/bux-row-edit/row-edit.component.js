import BuxClass from '../../../../bux.class';

import './row-edit.styles.scss';

// import './../bux-amount/amount.component';

customElements.define(
  'bux-row-edit',
  class rowEdit extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();

      this.isInit = false;

      this.helpEventFunction = () =>
        this.dispatchEvent(new CustomEvent('help'));
      this.editEventFunction = () =>
        this.dispatchEvent(new CustomEvent('edit'));
    }
    //////////////////////////

    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'nomarginbottom',
        'data-label-left',
        'data-label-right',
        'data-help',
        'editable',
        'data-amount'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelCaseName = this.toCamelCase(name);
      this[camelCaseName] = newVal;

      if (!this.isInit) return;
      this.render();
    }

    //////////////// Life Cycle
    // Component is mounted
    connectedCallback() {
      if (this.isInit) return;
      this.labelleft = this.getAttribute('data-label-left') || this.labelLeft;
      this.labelright =
        this.getAttribute('data-label-right') || this.labelRight;
      this.helpleft = this.getAttribute('data-help') || this.help;
      this.amount = this.getAttribute('data-amount') || this.amount;
      this.editable = this.getAttribute('editable') || this.editable;
      this.editableLink =
        this.getAttribute('data-editable-link') || this.editableLink;
      this.nomarginbottom =
        this.hasAttribute('nomarginbottom') &&
        this.getAttribute('nomarginbottom') !== 'false';

      this.render();
      this.isInit = true;
    }

    // Component is removed from dom
    disconnectedCallback() {
      this.removeEvent();
    }

    addEvent() {
      this.helpleftBtn = this.querySelector('.row-edit-left-help');
      if (this.helpleftBtn) {
        this.helpleftBtn.addEventListener('click', this.helpEventFunction);
      }

      this.editBtn = this.querySelector('.row-edit-edit-btn');
      if (this.editBtn) {
        this.editBtn.addEventListener('click', this.editEventFunction);
      }
    }

    removeEvent() {
      if (this.helpleftBtn) {
        this.helpleftBtn.removeEventListener('click', this.helpEventFunction);
      }

      if (this.editBtn) {
        this.editBtn.removeEventListener('click', this.editEventFunction);
      }
    }

    render() {
      this.removeEvent();
      this.innerHTML = `<div class="row-edit-wrap row-edit-wrap-entouree ${
        'button' || 'link' === this.editable ? 'row-edit-wrap-ico-ext' : ''
      }
      ${this.nomarginbottom ? 'u-nomarginbottom' : ''}">
        <div class="row-edit">
            <div class="row-edit-item">
                <div class="row-edit-item-left">
                    <span>${this.labelLeft}</span>
                    ${
                      'true' === this.help
                        ? `
                    <button aria-label="Accéder à l'aide pour ${
                      this.labelLeft
                    }" class="row-edit-btn row-edit-left-help">
                        <bux-svg data-icon="help" data-class="row-edit-action-svg"></bux-svg>
                    </button>
                    `
                        : ''
                    }
                </div>
                <div class="row-edit-item-right ${
                  this.amount ? '' : 'row-edit-item-right-bold'
                }">
                    ${this.labelRight ? `<span>${this.labelRight}</span>` : ''}
                    ${
                      this.amount
                        ? `<bux-amount data-value="${
                            this.amount
                          }"></bux-amount>`
                        : ''
                    }
                </div>
            </div>
            ${
              'link' === this.editable
                ? `
            <div class="row-edit-edit">
              <a href="${
                this.editableLink
              }" aria-label="aller vers la page d'édition de ${
                    this.labelLeft
                  }" class="row-edit-btn row-edit-edit-btn">
              <bux-svg data-icon="pen" data-class="row-edit-action-svg"></bux-svg>
              </a>
            </div>
            `
                : ''
            }
            ${
              'button' === this.editable
                ? `
            <div class="row-edit-edit">
              <button aria-label="Editer ${
                this.labelLeft
              }" class="row-edit-btn row-edit-edit-btn">
              <bux-svg data-icon="pen" data-class="row-edit-action-svg"></bux-svg>
              </button>
            </div>
            `
                : ''
            }
        </div>
      </div>`;
      this.addEvent();
    }
  }
);
