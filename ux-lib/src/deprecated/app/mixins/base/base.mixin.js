import { getNavigator } from '../../../../core/base/utils';

// url something like http://montest/bundle.js without bundle.js
let uxliburl = '';
if (document.currentScript && document.currentScript.src) {
  uxliburl = document.currentScript.src.replace('/bundle.js', '');
}

export default class Base extends HTMLElement {
  /**
   * Permet de mettre ou supprime une class sur un élément
   * en fonction de la valeur d'un boolean
   * @param {boolean} boolean  put/remove
   * @param {String} className the class name
   * @param {HTMLElement} el put/remove class on this element (optional default is this.container)
   */
  setBooleanClass(boolean, className, el) {
    const ele = el ? el : this.container;
    boolean ? ele.classList.add(className) : ele.classList.remove(className);
  }

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
