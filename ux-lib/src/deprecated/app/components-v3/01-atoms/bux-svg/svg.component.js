import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import ElementAlignmentMixin from '../../../mixins/layout/elementAlignment.mixin.js';
import ColorThemeMixin from '../../../mixins/typography/color-theme.mixin';
import styleDefault from './svg.style.css';

const Base = ColorThemeMixin(ElementAlignmentMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<svg aria-hidden="true" class="js-container c-svg2"></svg>`;

/**
 * Component to display icons
 *
 * @element bux2-svg
 *
 * @extends {BaseNoShadowComponent} base component to declare without shadow dom
 *
 */
export class Svg extends Base {
  static get style() {
    return styleDefault.toString();
  }

  static get properties() {
    return {
      icon: {
        type: 'string'
      },
      size: {
        type: 'string'
      },
      circle: {
        type: 'boolean'
      },
      rotate: {
        type: 'number'
      },
      fill: {
        type: 'string'
      },
      stroke: {
        type: 'string'
      }
    };
  }

  constructor() {
    super();
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    //if (oldValue === newValue) return;

    switch (name) {
      case 'icon':
        const symbol = svgEl.getElementById(this.icon);

        // L'icone existe
        if (symbol) {
          // Methode 1
          // add directly the path in dom
          [...symbol.children].forEach(child =>
            this.container.appendChild(child.cloneNode(true))
          );
          this.container.setAttribute(
            'viewBox',
            symbol.getAttribute('viewBox')
          );

          // Methode 2
          // add a new svg element with a symbol
          // add after use use element to ref the symbol
          // const svg = document.createElement('svg');
          // svg.appendChild(symbol);
          // this.$.appendChild(svg);
          // this.container.innerHTML = `<use href="#${this.icon}" xlink:href="#${this.icon}"></use>`;
        } else {
          // eslint-disable-next-line no-console
          console.error(`Icon : ${this.icon} doesn't exists`);
        }
        break;
      case 'size':
        this.container.classList.remove(
          'c-svg2--sm',
          'c-svg2--lg',
          'c-svg2--xl'
        );
        this.container.classList.add(`c-svg2--${this.size}`);
        break;
      case 'circle':
        this.setBooleanClass(this.circle, 'c-svg2--circle');
        break;
      case 'rotate':
        this.rotate
          ? (this.container.style.transform = `rotate(${this.rotate}deg)`)
          : (this.container.style.transform = '');
        break;
      case 'fill':
        this.container.style.fill = this.fill;
        break;
      case 'stroke':
        this.container.style.stroke = this.stroke;
        break;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('size')) this.container.classList.add(`c-svg2--lg`);
    this.container.style.fill = this.fill;
    this.container.style.stroke = this.stroke;
  }
}

// Insert Svg
let svgEl;

(function() {
  if (svgEl) return;

  // Maybe is already in dom (For mobile)
  svgEl = document.querySelector('#uxlibsvg');
  if (svgEl) {
    customElements.define('bux2-svg', Svg);
    return;
  }

  // Don't make two fetch if call multi times
  svgEl = true;
  let uxliburl = '';
  if (document.currentScript && document.currentScript.src) {
    uxliburl = document.currentScript.src.replace('/bundle.js', '');
  }
  fetch(`${uxliburl}/assets/images/icons.svg`, {
    method: 'GET',
    headers: new Headers(),
    mode: 'cors',
    cache: 'default'
  })
    .then(function(res) {
      return res.text();
    })
    .then(function(svg) {
      const tpl = document.createElement('template');
      tpl.innerHTML = svg;
      svgEl = tpl.content.querySelector('svg');
      // id is already set by the SpriteLoaderPlugin form webpack
      // svgEl.id = 'uxlibsvg';
      svgEl.style.display = 'none';

      // Fall back for old bux-svg
      // @todo remove this
      document.body.appendChild(svgEl);

      customElements.define('bux2-svg', Svg);
    });
})();
