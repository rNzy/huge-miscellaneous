import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import ElementAlignmentMixin from '../../../mixins/layout/elementAlignment.mixin';

const Base = ElementAlignmentMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<svg aria-hidden="true" class="js-container c-svg"></svg>
`;

/**
 * Ce composant permet d'afficher des icones.
 * Tous les icones pour une librairie doivent être enregistrés dans le dossier assets/icons au sein de la librairie.
 * Ou importés au sein même du composant si l'icone est spécifique.
 *
 * @element ux-svg
 *
 * @prop {String} icon - nom de l'icone
 * @prop {"xs"|"sm"|"md"|"lg"|"xl"|"xxl"} [libSize=md] - taille de l'icone
 * @prop {Boolean} [circle] - entoure l'icone d'un cercle
 * @prop {Number} [rotate] - applique une rotation à l'icone
 * @prop {Boolean} [shadow] - ajoute une ombre à l'icone
 *
 * @export
 * @class SvgBase
 * @extends {BaseShadowComponent, ElementAlignmentMixin}
 */
export class SvgBase extends Base {
  static get properties() {
    return {
      icon: {
        type: 'string'
      },
      libSize: {
        type: 'string'
      },
      circle: {
        type: 'boolean'
      },
      rotate: {
        type: 'number'
      },
      shadow: {
        type: 'boolean'
      }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'icon':
        const symbol = svgEl.getElementById(this.icon);

        // L'icone existe
        if (symbol) {
          if (oldValue !== null) {
            let svg = this.$.querySelector('svg');
            svg.innerHTML = '';
          }
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
      case 'lib-size':
        // Remove Old class
        let oldClassesStr = '';
        if (this.container && this.container.className) {
          // Svg stuff class name
          if (this.container.className.baseVal) {
            oldClassesStr = this.container.className.baseVal;
          } else {
            oldClassesStr = this.container.className;
          }
          const matches = oldClassesStr.match(/c-svg-size--\w*/g);
          if (matches) this.container.classList.remove([...matches]);
        }

        this.container.classList.add(`c-svg-size--${this.libSize}`);
        break;
      case 'circle':
        this.setBooleanClass(this.circle, 'c-svg--circle');
        break;
      case 'rotate':
        this.rotate
          ? (this.container.style.transform = `rotate(${this.rotate}deg)`)
          : (this.container.style.transform = '');
        break;
      case 'shadow':
        this.shadow
          ? this.container.classList.add('c-svg--shadow')
          : this.container.classList.remove('c-svg--shadow');
        break;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('lib-size'))
      this.container.classList.add(`c-svg-size--lg`);
  }
}

// Insert Svg
let svgEl = false;

export const init = SvgClass => {
  if (svgEl) return;

  // Maybe is already in dom (For mobile)
  svgEl = document.querySelector('#uxlibsvg');
  if (svgEl) {
    customElements.define('ux-svg', SvgClass);
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
    .then(res => {
      if (res.status !== 200) throw new Error();
      return res.text();
    })
    .then(svg => {
      const tpl = document.createElement('template');
      tpl.innerHTML = svg;
      svgEl = tpl.content.querySelector('svg');
      // id is already set by the SpriteLoaderPlugin form webpack
      // svgEl.id = 'uxlibsvg';
      svgEl.style.display = 'none';

      // Fall back for old ux-svg
      // @todo remove this
      document.body.appendChild(svgEl);

      customElements.define('ux-svg', SvgClass);
    })
    .catch(err1 => {
      // Second try
      fetch(`./assets/images/icons.svg`, {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
      })
        .then(res => {
          if (res.status !== 200) throw new Error();
          return res.text();
        })
        .then(svg => {
          const tpl = document.createElement('template');
          tpl.innerHTML = svg;
          svgEl = tpl.content.querySelector('svg');
          // id is already set by the SpriteLoaderPlugin form webpack
          // svgEl.id = 'uxlibsvg';
          svgEl.style.display = 'none';

          // Fall back for old ux-svg
          // @todo remove this
          document.body.appendChild(svgEl);

          customElements.define('ux-svg', SvgClass);
        })
        .catch(err2 => {
          // eslint-disable-next-line no-console
          console.error('Error when loading svg for ux-lib', err1, err2);
        });
    });
};
