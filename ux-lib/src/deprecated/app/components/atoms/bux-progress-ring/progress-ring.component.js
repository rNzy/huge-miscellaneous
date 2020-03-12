/**
 * @todo add aria-live attributes in case this component is live updating
 */
import BuxClass from '../../../../bux.class';
import './progress-ring.styles.scss';

customElements.define(
  'bux-progress-ring',
  class ProgressRing extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();

      // @Props
      this.value = 0;

      // Private variable
      this.radius = 50;
      this.stroke = 8;
      this.normalizedRadius = this.radius - this.stroke / 2;
      this.circumference = this.normalizedRadius * 2 * Math.PI;
      this.circle = null;
      this.progessContent = null;

      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Get attribute on web component
      this.value = this.getAttribute('data-value') || 0;
      this.a11yLabel = this.getAttribute('a11y-label') || '';
      if (this.isInit) return;

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Select element
      this.circle = tpl.content.querySelector('circle');
      this.progessContent = tpl.content.querySelector(
        '.c-progress-ring__content'
      );

      this.progressRing = tpl.content.querySelector('.c-progress-ring');

      if (this.hasAttribute('loading')) {
        this.setLoading();
      }
      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.progessContent.appendChild(this.childNodes[0]);
      }

      this.setProgress(this.value);

      // Insert your element in the dom
      this.appendChild(tpl.content);

      this.isInit = true;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['data-value', 'a11y-label', 'loading'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      this.setProgress(newVal);
      if (name == 'a11y-label' && this.progressRing) {
        this.progressRing.setAttribute('aria-label', newVal);
      }
      if (name == 'loading') {
        this.value = 25;
        if (this.progressRing) {
          this.progressRing.classList.add('c-progress-ring--loading');
        }
      }
    }

    // Helper to change progress
    setProgress(percent) {
      const offset = this.circumference - (percent / 100) * this.circumference;
      if (this.circle) {
        this.circle.style.strokeDashoffset = offset;
      }
    }

    setLoading() {
      this.value = 25;
      this.stroke = 12;
      if (this.progressRing) {
        this.progressRing.classList.add('c-progress-ring--loading');
      }
    }

    template() {
      return `
        <div class="c-progress-ring" aria-label="${this.a11yLabel}">

          <svg
            class="c-progress-ring__svg"
            viewBox="0 0 100 100"
          >
            <circle
              class="c-progress-ring__circle"
              stroke-dasharray="${this.circumference} ${this.circumference}"
              style="stroke-dashoffset:${this.circumference}"
              stroke-width="${this.stroke}"
              fill="transparent"
              r="${this.normalizedRadius}"
              cx="${this.radius}"
              cy="${this.radius}"
            />
          </svg>
          <svg class="c-progress-ring__svg c-progress-ring__svg--shadow" viewBox="0 0 100 100">
            <circle class="c-progress-ring__shadow" stroke-dasharray="301.59289474462014 301.59289474462014" style="stroke-dashoffset: 0;" stroke-width="${
              this.stroke
            }" fill="transparent" r="${this.normalizedRadius}" cx="${
        this.radius
      }" cy="${this.radius}"></circle>
          </svg>
          <div class="c-progress-ring__content"></div>
        </div>
      `;
    }
  }
);
