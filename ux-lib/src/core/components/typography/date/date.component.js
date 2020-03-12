import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import TextSizeMixin from '../../../mixins/typography/textSize.mixin';
import BoldMixin from '../../../mixins/typography/bold.mixin.js';
import TextAlignmentMixin from '../../../mixins/typography/textAlignment.mixin.js';
import ColorThemeMixin from '../../../mixins/typography/color-theme.mixin';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin';

const Base = AriaHiddenStyleMixin(
  ColorThemeMixin(
    TextSizeMixin(BoldMixin(TextAlignmentMixin(BaseShadowComponent)))
  )
);

const tpl = document.createElement('template');
tpl.innerHTML =
  '<span aria-hidden="true" class="js-container c-date"><slot></slot></span><span class="c-date--a11y a11y-hidden"></span>';

// Mesure conservatoire : les formats dd-mm et dd/mm ne sont pas encore implémentés
// const validFormat = ['dd-mm-yyyy', 'dd/mm/yyyy', 'dd-mm',
// 'dd/mm', 'mm/yy', 'mm-yy'];
const validFormat = ['dd-mm-yyyy', 'dd/mm/yyyy', 'mm/yy', 'mm-yy'];

/**
 * Affiche une date.
 *
 * @element ux-date
 *
 * @prop {String} value - valeur de la date
 * @prop {"dd-mm-yyyy"|"dd/mm/yyyy"|"mm/yy"|"mm-yy"} [formatIn=dd-mm-yyyy] - format de la date
 *
 * @slot default
 *
 * @export
 * @class DateBase
 * @extends {BaseShadowComponent, TextAlignmentMixin, BoldMixin, TextSizeMixin, ColorThemeMixin, AriaHiddenStyleMixin}
 */
export default class DateBase extends Base {
  static get properties() {
    return {
      value: { type: 'string' },
      formatIn: { type: 'string', defaultValue: 'dd-mm-yyyy' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._displayDate = this.$.querySelector('.c-date');
    this._a11yDate = this.$.querySelector('.c-date--a11y');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'value' || name === 'format-in') {
      if (this.value) {
        this.validateAndVerboseDate(this.value.replace(/\//g, '-'));
      } else {
        this._displayDate.innerHTML = '';
      }
    }
  }

  validateAndVerboseDate(val) {
    if (
      !(validateFormat(this.formatIn) && validateDateFormat(val, this.formatIn))
    ) {
      this.setError();
      return;
    }

    // split date into an array to test
    const dateArray = val.split('-');

    let isoFormat = '';
    let finalValue = '';
    let verboseDate = '';

    if (this.formatIn === 'dd-mm-yyyy' || this.formatIn === 'dd/mm/yyyy') {
      // testing day & month value
      if (dateArray[0] > 31 || dateArray[1] > 12) {
        // developer log
        // eslint-disable-next-line no-console
        console.error(
          'erreur valeur date : ',
          dateArray[0] + ' > 31',
          ' OR ',
          dateArray[1] + ' > 12'
        );
        this.setError();
        return;
      }

      //date format to satisfy new Date('foo-bar-baz')
      isoFormat = `${dateArray[0]}-02-${dateArray[0]}`;

      // create aria-label date equivalent
      verboseDate = toVerboseDate(isoFormat, this.formatIn);
    } else if (this.formatIn === 'mm-yy' || this.formatIn === 'mm/yy') {
      // testing month
      if (dateArray[0] > 12 || dateArray[1] > 99) {
        // developer log
        // eslint-disable-next-line no-console
        console.error(
          'erreur valeur date : ',
          dateArray[0] + ' > 12',
          ' OR ',
          dateArray[1] + ' > 99'
        );
        this.setError();
        return;
      }

      //date format to satisfy mm-01-20yy
      isoFormat = `${dateArray[0]}-01-20${dateArray[1]}`;

      // create aria-label date equivalent
      verboseDate = toVerboseDate(isoFormat, this.formatIn);
    } else {
      this.setError();
      return;
    }

    if (this.formatIn.includes('-')) {
      finalValue = dateArray.join('-');
    } else if (this.formatIn.includes('/')) {
      finalValue = dateArray.join('/');
    }

    // inject to element
    this._displayDate.innerHTML = finalValue;
    this._displayDate.classList.remove('c-date--error');

    // inject to a11y span
    this._a11yDate.innerHTML = verboseDate;
  }

  setError() {
    // inject error to element
    this._displayDate.innerHTML = '#DATE-FORMAT-ERROR!';
    this._displayDate.classList.add('c-date--error');
  }
}

function validateFormat(format) {
  return validFormat.includes(format);
}

function validateDateFormat(date, format) {
  switch (format) {
    case 'dd-mm-yyyy':
    case 'dd/mm/yyyy':
      return /^\d{2}-\d{2}-\d{4}$/.test(date);
    // Mesure conservatoire : les formats dd-mm et dd/mm ne sont pas encore implémentés
    // case 'dd-mm':
    // case 'dd/mm':
    case 'mm-yy':
    case 'mm/yy':
      return /^\d{2}-\d{2}$/.test(date);
    default:
      return false;
  }
}

function toVerboseDate(date, format) {
  const newDate = new Date(date);

  switch (format) {
    case 'dd-mm-yyyy':
    case 'dd/mm/yyyy':
      return newDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    // Mesure conservatoire : les formats dd-mm et dd/mm ne sont pas encore implémentés
    // case 'dd-mm':
    // case 'dd/mm':
    //   return newDate.toLocaleDateString('fr-FR', {
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric'
    //   });
    case 'mm-yy':
    case 'mm/yy':
      return newDate.toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric'
      });
  }
}
