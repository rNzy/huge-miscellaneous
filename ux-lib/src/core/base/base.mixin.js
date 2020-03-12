import { getNavigator } from './utils';

// url something like http://montest/bundle.js without bundle.js
let uxliburl = '';
if (document.currentScript && document.currentScript.src) {
  uxliburl = document.currentScript.src.replace('/bundle.js', '');
}

export default class Base extends HTMLElement {
  /**
   * Permet de mettre ou supprime une class sur un élément
   * en fonction de la valeur d'un boolean
   * @param {Boolean} boolean  - put/remove
   * @param {String} className - the class name
   * @param {HTMLElement} el - put/remove class on this element (optional default is this.container)
   */
  setBooleanClass(boolean, className, el) {
    const ele = el ? el : this.container;
    boolean ? ele.classList.add(className) : ele.classList.remove(className);
  }

  /**
   * Permet de mettre ou supprime une attribut sur un élément
   * en fonction de la valeur d'un boolean
   * @param {Boolean} boolean  - put/remove
   * @param {String} className - the class name
   * @param {HTMLElement} el - put/remove class on this element (optional default is this.container)
   * @param {False|Boolean} forcedDisplay - quand true mais l'attribut à false plutot que de le supprimer
   */
  setBooleanAttr(boolean, attrName, el, forcedDisplay = false) {
    const ele = el ? el : this.container;
    if (forcedDisplay) {
      ele.setAttribute(attrName, boolean);
    } else {
      boolean
        ? ele.setAttribute(attrName, 'true')
        : ele.removeAttribute(attrName);
    }
  }

  /**
   * Chemin du js principal de l'ux library
   *
   * @readonly
   * @memberof Base
   */
  get uxLibUrl() {
    return uxliburl;
  }

  /**
   * Get navigator with version
   *
   * output exemple :
   * {
   *  name: 'Chrome',
   *  version: '62'
   * }
   */
  get navigator() {
    return getNavigator();
  }
}
