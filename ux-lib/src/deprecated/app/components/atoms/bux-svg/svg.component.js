import BuxClass from '../../../../bux.class';

import './svg.styles.scss';

class Svg extends BuxClass {
  ////////////////////// Constructor
  constructor() {
    super();
    this.isInit = false;
  }
  //////////////////////////

  //////////////// Attribute change
  static get observedAttributes() {
    return ['data-icon', 'data-class'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    const camelCaseName = this.toCamelCase(name);
    this[camelCaseName] = newVal;
    this.render();
  }

  //////////////// Life Cycle
  // Component is mount
  connectedCallback() {
    if (this.isInit) return;
    this.isInit = true;
    this.icon = this.getAttribute('data-icon') || '';
    this.classname = this.getAttribute('data-class') || '';
    this.render();
  }

  render() {
    if (this.icon === '') {
      this.innerHTML = '';
    } else {
      this.innerHTML = `
        <svg aria-hidden="true" class="c-svg ${this.classname}">
          <use xlink:href="#${this.icon}"></use>
        </svg>`;
    }
  }
}

window.customElements.define('bux-svg', Svg);
