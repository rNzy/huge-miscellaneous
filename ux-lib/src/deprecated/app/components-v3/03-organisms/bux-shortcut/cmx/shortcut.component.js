import Shortcut from '../shortcut.component';

import styleDefault from './shortcut.style.css';

class CMXShortcut extends Shortcut {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('bux-shortcut', CMXShortcut);
