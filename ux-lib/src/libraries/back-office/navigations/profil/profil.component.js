import ProfilBase from '../../../../core/components/navigations/profil/profil.component';

import './profil.png';

import styleDefault from './profil.style.css';

class Profil extends ProfilBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-profil', Profil);
