import BuxClass from '../../../../bux.class';
import './checkbox-group.styles.scss';

customElements.define(
  'bux-checkbox-group',

  class CheckboxGroup extends BuxClass {
    constructor() {
      super();
      this.isInit = false;

      this.checkboxName =
        'bux-checkbox-group-' + (Math.floor(Math.random() * 10000) + 2);
      this.handleClick = this.clickEvent.bind(this);
    }

    static get observedAttributes() {
      return ['layout'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      this.layout = newVal;
      if (!this.isInit) return;
      this.setLayout();
    }

    connectedCallback() {
      if (this.isInit) return;
      this.a11yLabel = this.getAttribute('a11y-label') || false;
      this.layout = this.getAttribute('layout') || 'default';
      this.state = this.getAttribute('data-state') || 'unchecked';

      this.hidebtn =
        this.hasAttribute('hide-button') &&
        this.getAttribute('hide-button') !== 'false';

      this.stepIn =
        this.hasAttribute('a11y-step-in') &&
        this.getAttribute('a11y-step-in') !== 'false';

      this.stepOut =
        this.hasAttribute('a11y-step-out') &&
        this.getAttribute('a11y-step-out') !== 'false';

      this.randomId = Math.floor(Math.random()*10000);

      const tpl = document.createElement('template');
      tpl.innerHTML = `
          <div class="c-checkbox-group-parent">
            <button class="c-checkbox-group-btn-all"></button>

              ${
                this.a11yLabel
                  ? `
            <div class="c-checkbox-group" role="group" aria-labelledby="legend-${this.randomId}">
              <div id="legend-${this.randomId}" class="c-checkbox-group__legend u-hidden-visually">${
                this.a11yLabel
              }</div>
              `
                  : `<div class="c-checkbox-group">`
              }
            </div>
          </div>
        `;
      this.parent = tpl.content.querySelector('.c-checkbox-group-parent');

      this.container = tpl.content.querySelector('.c-checkbox-group');

      while (this.childNodes.length > 0) {
        this.container.appendChild(this.childNodes[0]);
      }

      this.checkboxItems = tpl.content.querySelectorAll('bux-checkbox');
      this.btnEl = tpl.content.querySelector('.c-checkbox-group-btn-all');

      this.getState();
      this.setLayout();
      this.setButtonMsg();
      this.setSteps();
      this.hideButton();

      this.checkboxItems.forEach(checkboxItem => {
        // Set attribute name
        checkboxItem.setAttribute('data-name', this.checkboxName);

        // Check if all checkbox are check or un uncheck
        // to change the message
        checkboxItem.addEventListener('change', () => {
          // All checkbox are checked
          if ([...this.checkboxItems].every(el => el.checked)) {
            this.state = 'checked';
            this.setButtonMsg();
          } else if ([...this.checkboxItems].every(el => !el.checked)) {
            this.state = 'unchecked';
            this.setButtonMsg();
          }
        });
      });

      this.btnEl.addEventListener('click', this.handleClick);

      this.appendChild(tpl.content);

      this.isInit = true;
    }

    setLayout() {
      switch (this.layout) {
        case '2-columns-md':
          this.container.classList.remove('o-columns--4');
          this.container.classList.add('o-columns@md', 'o-columns--2');
          break;
        case '4-columns-md':
          this.container.classList.remove('o-columns--2');
          this.container.classList.add('o-columns@md', 'o-columns--4');
          break;
        case 'default':
          this.container.classList.remove(
            'o-columns@md',
            'o-columns--2',
            'o-columns--4'
          );
          break;
      }
    }

    setButtonMsg() {
      if (this.state === 'unchecked') {
        this.btnEl.textContent = 'Tout sélectionner';
      } else {
        this.btnEl.textContent = 'Tout désélectionner';
      }
    }

    hideButton() {
      if (this.hidebtn) {
        this.btnEl.setAttribute('aria-hidden', true);
        this.btnEl.setAttribute('class', 'c-checkbox-group-btn-all u-hidden');
      }
    }

    getState() {
      const stateArr = [];
      // Get state of all checkbox
      this.checkboxItems.forEach(checkboxItem => {
        stateArr.push(checkboxItem.checked);
      });

      this.state = 'unchecked';
      if ([...new Set(stateArr)].length === 1 && stateArr[0] === true)
        this.state = 'checked';
    }

    clickEvent() {
      this.checkboxItems = this.querySelectorAll('bux-checkbox');
      this.getState();
      if (this.state === 'unchecked') {
        this.checkboxItems.forEach(checkboxItem => {
          checkboxItem.setAttribute('checked', 'true');
        });
        this.state = 'checked';
        this.setButtonMsg();
      } else {
        this.checkboxItems.forEach(checkboxItem => {
          checkboxItem.removeAttribute('checked');
        });
        this.state = 'unchecked';
        this.setButtonMsg();
      }
    }

    setSteps() {
      if (this.stepIn === true) {
        const stepIn = document.createElement('span');
        stepIn.setAttribute('class', 'u-hidden-visually');
        stepIn.setAttribute('tabindex', 0);
        stepIn.setAttribute('aria-label', 'Début de la zone de saisie');
        this.parent.insertBefore(stepIn, this.btnEl);
      }
      if (this.stepOut === true) {
        const stepOut = document.createElement('span');
        stepOut.setAttribute('class', 'u-hidden-visually');
        stepOut.setAttribute('tabindex', 0);
        stepOut.setAttribute('aria-label', 'Fin de la zone de saisie');
        this.parent.appendChild(stepOut);
      }
    }
  }
);
