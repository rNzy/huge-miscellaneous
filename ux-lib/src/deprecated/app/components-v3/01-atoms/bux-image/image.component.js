import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import ElementAlignmentMixin from '../../../mixins/layout/elementAlignment.mixin.js';
import styleDefault from './image.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<img class="js-container" alt=""/>';

/**
 * Component to display images
 *
 * @element bux2-image
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @property {String} src - filename and set the right path
 * @property {String} alt - alternative text
 * @property {Number} height - hauteur de l'image
 * @property {Number} width - largeur de l'image
 * @property {Boolean} a11yHidden - mettre aria-hidden true sur l'image
 */

export class Image extends ElementAlignmentMixin(BaseShadowComponent) {
  static get properties() {
    return {
      src: {
        type: 'string'
      },
      alt: {
        type: 'string'
      },
      height: {
        type: 'number'
      },
      width: {
        type: 'number'
      },
      a11yHidden: {
        type: 'boolean'
      }
    };
  }

  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    switch (name) {
      case 'src':
        this._setSrc();
        break;
      case 'alt':
        this.container.setAttribute('alt', this.alt);
        break;
      case 'height':
        this.container.setAttribute('height', this.height);
        break;
      case 'width':
        this.container.setAttribute('width', this.width);
        break;
      case 'a11y-hidden':
        this.container.setAttribute('aria-hidden', true);
        break;
    }
  }

  _setSrc() {
    const imagePath = `${this.uxLibUrl}/assets/images/`;

    let finalSrc = this.src;

    if (
      !(
        finalSrc.startsWith('http') ||
        finalSrc.startsWith('https') ||
        finalSrc.startsWith('//')
      )
    ) {
      // Remove first /
      finalSrc = finalSrc.startsWith('/') ? finalSrc.substr(1) : finalSrc;
      // Remove ./
      finalSrc = finalSrc.startsWith('./') ? finalSrc.substr(2) : finalSrc;
      // add base
      finalSrc = imagePath + finalSrc;
    }
    this.container.setAttribute('src', finalSrc);
  }
}

window.customElements.define('bux2-image', Image);
