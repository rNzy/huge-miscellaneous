import BuxClass from '../../../../bux.class';
import './radio-group.styles.scss';

customElements.define(
  'bux-radio-group',

  class RadioButton extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    static get observedAttributes() {
      return ['data-value'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (!this.isInit) return;
      this.value = newVal;
      this.setValue();
    }

    setValue() {
      this.radioItems.forEach(radioItem => {
        if (radioItem.getAttribute('data-value') === this.value) {
          radioItem.setAttribute('checked', 'true');
        } else {
          radioItem.removeAttribute('checked');
        }
      });
    }

    connectedCallback() {
      if (this.isInit) return;

      this.a11yLabel = this.getAttribute('a11y-label') || false;
      this.type = this.getAttribute('type') || 'list';
      this.radioName =
        'bux-radio-group-' + (Math.floor(Math.random() * 10000) + 2);

      this.stepIn =
        this.hasAttribute('a11y-step-in') &&
        this.getAttribute('a11y-step-in') !== 'false';

      this.stepOut =
        this.hasAttribute('a11y-step-out') &&
        this.getAttribute('a11y-step-out') !== 'false';

      this.noMarginBottom =
        this.hasAttribute('no-margin-bottom') &&
        this.getAttribute('no-margin-bottom') !== 'false';

      const tpl = document.createElement('template');
      tpl.innerHTML = `
        <div class="c-radio-group">
          ${
            this.a11yLabel
              ? `
          <legend class="c-radio-group__legend">${this.a11yLabel}</legend>
          `
              : ''
          }
        </div>`;

      this.container = tpl.content.querySelector('.c-radio-group');
      this.legend = tpl.content.querySelector('legend');

      while (this.children.length > 0) {
        this.container.appendChild(this.children[0]);
      }

      this.radioItems = tpl.content.querySelectorAll('bux-radio-button');

      this.setType();

      this.radioItems.forEach(radioItem => {
        // Set attribute name
        radioItem.setAttribute('data-name', this.radioName);

        // Set state for all radio btn
        radioItem.addEventListener('change', e => {
          this.radioItems.forEach(radioIt => {
            if (radioIt === e.target.parentElement) {
              radioIt.checked = true;
              this.setAttribute(
                'data-value',
                radioIt.getAttribute('data-value')
              );
            } else {
              radioIt.checked = false;
            }
          });
        });
      });

      this.setSteps();
      this.setMarginBottom();
      this.appendChild(tpl.content);
      this.isInit = true;
    }

    setType() {
      if (this.type === 'row') {
        this.container.classList.add('c-radio-group--row');
        this.radioItems.forEach(el => el.classList.add('c-radio-group__item'));
      }
    }

    setMarginBottom() {
      if (this.noMarginBottom === true) {
        const margin =
          this.type === 'row'
            ? 'c-radio-group--row--no-margin-bottom'
            : 'c-radio-group--no-margin-bottom';
        this.container.classList.add(margin);
      }
    }

    setSteps() {
      if (this.stepIn === true) {
        const stepIn = document.createElement('span');
        stepIn.setAttribute('class', 'u-hidden-visually');
        stepIn.setAttribute('tabindex', 0);
        stepIn.setAttribute('aria-label', 'Début de la zone de saisie');
        this.container.insertBefore(stepIn, this.legend);
      }
      if (this.stepOut === true) {
        const stepOut = document.createElement('span');
        stepOut.setAttribute('class', 'u-hidden-visually');
        stepOut.setAttribute('tabindex', 0);
        stepOut.setAttribute('aria-label', 'Fin de la zone de saisie');
        this.container.appendChild(stepOut);
      }
    }
  }
);
