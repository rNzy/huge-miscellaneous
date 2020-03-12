import InputBase from './input.component.js';

/**
 * Composant affichant un champ de type number.
 *
 * @element ux-input-number
 *
 * @export
 * @class InputNumberBase
 * @extends {InputBase}
 */
export default class InputNumberBase extends InputBase {
  constructor() {
    super();
    this.input.setAttribute('type', 'text');
    this.input.classList.add('c-input-number');
  }

  setValue(val) {
    this.formItSelf = true;

    if (val === null || typeof val === 'undefined') {
      this.clearInput(this);
      return;
    }

    this._setValueForNumber(val);
  }

  _setValueForNumber(val) {
    if (this.state === 'error') this.state = 'empty';

    let newValue = '';

    if (val === null || typeof val === 'undefined') {
      // Si valeur nulle
      this.clearInput(this);
    } else {
      // Si valeur non nulle

      // Remove white space
      newValue = val.replace(/\s/g, '');

      // convert , to .
      newValue = newValue.replace(/,/g, '.');

      // Pas deux virgule dans le meme nombre
      if (newValue.split('.').length === 3 && newValue.slice(-1) === '.') {
        this.input.value = this.input.value.slice(0, -1);
        return;
      }

      // Ne pas supprimer le plus et le moins devant un chiffre
      // et ne pas pas permettre à l'utilisateur de faire ++..++ ou --..--
      // ou mettre un - ou + au milieu d'un nombre
      if (newValue.slice(-1) === '-' || newValue.slice(-1) === '+') {
        // ne pas permettre de mettre + et - au milieu d'un nombre
        // ou d'écrire ++ ou --
        // ex : 52-1
        if (newValue.length > 1) {
          this.input.value = this.input.value.slice(0, -1);
          return;
        }

        // ne pas permettre de mettre - si le min est sup à 0
        if (newValue.slice(-1) === '-' && this.min && this.min >= 0) {
          this.input.value = null;
          return;
        }

        // Ne pas supprimer le plus et le moins devant un chiffre
        return;
      }

      // Check is last char is dot or minus or pos and the "avant-dernier" is a number
      // wait other char to do something
      if (
        newValue.slice(-1) === '.' &&
        Number.isInteger(parseInt(newValue.slice(-2, -1))) &&
        this.round != 0
      ) {
        return;
      }

      // Regarde si l'utilisateur essaye de rentrer 0.0xxxxx1
      const oldNumberAfterDot = countDecimals(newValue);

      // string to number
      newValue = parseFloat(newValue);

      if (!isNaN(newValue)) {
        // Not inf to min
        if (this.min) {
          if (newValue < this.min) newValue = removeLastEnterNumber(newValue);
        }

        // Not sup to max
        if (this.max) {
          if (newValue > this.max) newValue = removeLastEnterNumber(newValue);
        }

        // good format
        newValue = newValue.toLocaleString('fr-FR');
        const newNumberAfterDot = countDecimals(newValue);

        // Rajoute les 0 après la virgule
        if (oldNumberAfterDot > newNumberAfterDot) {
          // Pas de virgule dans le nouveau
          if (newNumberAfterDot === 0) newValue += ',';

          let diff = oldNumberAfterDot - newNumberAfterDot;

          while (diff > 0) {
            newValue += '0';
            diff--;
          }
        }

        // Round this
        // si il y a plus de décimal que la valeur de l'attribut round
        // il les supprimes
        const roundNumber = countDecimals(newValue);
        if (this.round && roundNumber > this.round) {
          newValue = '' + newValue;
          newValue = newValue.slice(0, this.round - roundNumber);
        }

        // Si nombre entier supprime la virgule restante.
        if (this.round == 0 && newValue.slice(-1) === ',') {
          newValue = newValue.slice(0, -1);
        }

        if (newValue === 'NaN') {
          this.clearInput(this);
          return;
        }

        this.input.value = newValue;

        // convert again to number to be sure to have the same
        // number from input and bux2-input
        // because sometime more number after the float
        // Remove white space
        newValue = newValue.replace(/\s/g, '');
        newValue = newValue.replace(/,/g, '.');

        this.value = parseFloat(newValue);

        this.input.classList.remove('c-input-noval');
      } else {
        this.clearInput(this);
      }
    }
  }
}

function countDecimals(val) {
  let proVal = val.split('.');
  if (proVal.length === 1) {
    proVal = val.split(',');
  }

  return proVal.length === 1 ? 0 : proVal[1].length;
}

function removeLastEnterNumber(num) {
  num = '' + num;
  num = num.slice(0, -1);
  return parseFloat(num);
}
