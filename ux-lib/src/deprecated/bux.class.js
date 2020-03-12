const buxObserved = [
  'bold',
  'noborder',
  'nopadding',
  'nomarginbottom',
  'margintopmedium',
  'marginrightmedium',
  'marginbottommedium'
];

// url something like http://montest/bundle.js without bundle.js
let uxliburl = '';
if (document.currentScript && document.currentScript.src) {
  uxliburl = document.currentScript.src.replace('/bundle.js', '');
}

export default class BuxClass extends HTMLElement {
  static get observedAttributes() {
    return buxObserved;
  }

  getObserved() {
    return buxObserved;
  }

  get uxLibUrl() {
    return uxliburl;
  }

  // property to set font-weight to bold on text element
  set bold(value) {
    const isBold = Boolean(value);

    if (isBold) this.setAttribute('bold', '');
    else this.removeAttribute('bold');
  }

  get bold() {
    return this.hasAttribute('bold');
  }

  // property to delete a border-bottom on any element
  set noborder(value) {
    const isNoborder = Boolean(value);

    if (isNoborder) this.setAttribute('noborder', '');
    else this.removeAttribute('noborder');
  }

  get noborder() {
    return this.hasAttribute('noborder');
  }

  // property to delete padding on any element
  set nopadding(value) {
    const isNopadding = Boolean(value);

    if (isNopadding) this.setAttribute('nopadding', '');
    else this.removeAttribute('nopadding');
  }

  get nopadding() {
    return this.hasAttribute('nopadding');
  }

  toCamelCase(word) {
    const array = word.split('-');

    // Remove data at start
    if (array[0] === 'data') array.shift();

    return array.reduce((acc, current, index) => {
      const capitalized =
        index > 0
          ? current.charAt(0).toUpperCase() + current.slice(1)
          : current;
      return acc + capitalized;
    }, '');
  }

  getBooleanAttribute(attr) {
    return this.hasAttribute(attr) && this.getAttribute(attr) !== 'false';
  }

  isTrue(myVar) {
    if ('1' === myVar || 1 === myVar || true === myVar || 'true' === myVar)
      return true;

    return false;
  }

  toSnakeCase(word) {
    let tmp = word
      .replace(/([A-Z])/g, match => ` ${match}`)
      .replace(/^./, match => match.toUpperCase());

    tmp = tmp.charAt(0).toLowerCase() + tmp.slice(1);

    tmp = tmp.split('-');

    if (tmp[0] === 'data') tmp.shift();

    return tmp.join('-');
  }

  buxAttributeChangedCallback(name) {
    const bol =
      this.childNodes && this.childNodes[0] && this.childNodes[0].classList;

    switch (name) {
      case 'bold':
        if (bol) {
          this.childNodes[0].classList.add('u-text-bold');
        } else {
          this.classList.add('u-text-bold');
        }
        break;
      case 'noborder':
        if (bol) {
          this.childNodes[0].classList.add('u-text-bold');
        } else {
          this.classList.add('u-noborder');
        }
        break;
      case 'nopadding':
        if (bol) {
          this.childNodes[0].classList.add('u-nopadding');
        } else {
          this.classList.add('u-nopadding');
        }
        break;
      case 'margintopmedium':
        if (bol) {
          this.childNodes[0].classList.add('u-margintopmedium');
        } else {
          this.classList.add('u-margintopmedium');
        }
        break;
      case 'marginrightmedium':
        if (bol) {
          this.childNodes[0].classList.add('u-marginrightmedium');
        } else {
          this.classList.add('u-marginrightmedium');
        }
        break;
      case 'marginbottommedium':
        if (bol) {
          this.childNodes[0].classList.add('u-marginbottommedium');
        } else {
          this.classList.add('u-marginbottommedium');
        }
        break;
      case 'nomarginbottom':
        if (bol) {
          this.childNodes[0].classList.add('u-nomarginbottom');
        } else {
          this.classList.add('u-nomarginbottom');
        }
        break;
    }
  }

  attributeChangedCallback(name) {
    this.buxAttributeChangedCallback(name);
  }
}
