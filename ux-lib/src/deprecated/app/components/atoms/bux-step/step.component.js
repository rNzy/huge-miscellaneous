import BuxClass from '../../../../bux.class';
import './step.styles.scss';

// import '../bux-svg/svg.component';

customElements.define(
  'bux-step',
  class Step extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['data-state', 'data-label', 'data-number'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;

      if (!this.isInit) return;

      switch (camelName) {
        case 'state':
          this.setState();
          break;
        case 'label':
          this.setLabel();
          break;
        case 'number':
          this.setNumber();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;

      // Init attribut
      // Call this function for every
      // Observed value
      this.label = this.getAttribute('data-label') || '';
      this.state = this.getAttribute('data-state') || '';
      this.number = this.getAttribute('data-number') || '';

      // Exemple for true, false attribute
      // this.validated =
      //   this.hasAttribute('validated') &&
      //   this.getAttribute('validated') !== 'false';

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Here you can select element
      // this.wrapSlot = tpl.content.querySelector('.c-step__number');
      this.numberEl = tpl.content.querySelector('.c-step__number');
      this.labelEl = tpl.content.querySelector('.c-step__label');
      this.stateLabelEl = tpl.content.querySelector('.c-step__a11y-label');

      // Insert slot in previous selected element
      // while (this.childNodes.length > 0) {
      //   this.wrapSlot.appendChild(this.childNodes[0]);
      // }

      this.setNumber();
      this.setLabel();
      this.setState();

      // Insert your element in the dom
      this.appendChild(tpl.content);
    }

    setLabel() {
      this.labelEl.textContent = this.label;
    }

    setNumber() {
      //If state is valid replace number by SVG icon, else classic number
      if (this.state === 'valid') {
        this.numberEl.childNodes[1].textContent = null;
        const buxSvg = document.createElement('bux-svg');
        buxSvg.setAttribute('data-icon', 'check');
        this.numberEl.childNodes[1].appendChild(buxSvg);
      } else {
        this.numberEl.childNodes[1].textContent = this.number;
        this.numberEl.childNodes[3].textContent = `Étape ${this.number}`;
      }
    }

    setState() {
      let numberClass = 'c-step__number c-step__number--';
      let labelClass = 'c-step__label c-step__label--';

      //Applying style on the number and label text based on the state
      this.numberEl.setAttribute('class', (numberClass += this.state));
      this.labelEl.setAttribute('class', (labelClass += this.state));

      //Adding state message for blind users
      switch (this.state) {
        case 'current':
          this.stateLabelEl.textContent = 'Étape en cours';
          break;
        case 'valid':
          this.stateLabelEl.textContent = 'Étape terminée';
          break;
        case 'upcoming':
          this.stateLabelEl.textContent = 'Étape à venir';
          break;
      }

      //Since state can change the number, refreshing it at the same time
      this.setNumber();
    }

    ////////////////// Helper
    template() {
      return `
      <div class="c-step">
        <div class="c-step__number">
          <span aria-hidden='true'></span>
          <span class='u-hidden-visually'></span>
        </div>
        <span class="c-step__label"></span>
        <span class="u-hidden-visually c-step__a11y-label"></span>
      </div>
      `;
    }
  }
);
