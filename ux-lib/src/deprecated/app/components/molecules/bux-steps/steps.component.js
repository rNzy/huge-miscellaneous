import BuxClass from '../../../../bux.class';
import './steps.styles.scss';

// import '../../atoms/bux-step/step.component';

customElements.define(
  'bux-steps',
  class StepsHeader extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = '<div class="c-steps"></div>';

      // Here you can select element
      this.wrapSlot = tpl.content.querySelector('.c-steps');

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.wrapSlot.appendChild(this.childNodes[0]);
      }

      // Insert your element in the dom
      this.appendChild(tpl.content);
    }
  }
);
