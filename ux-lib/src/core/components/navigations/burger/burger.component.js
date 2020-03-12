import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import BreakPointMixin from '../../../../core/mixins/dom/breakpoint.mixin';
import TriggerElMixin from '../../../../core/mixins/event/triggerEl.mixin';
import BtnNoStyle from '../../../../core/mixins/styles/btnNoStyle.mixin';

import styleDefault from './burger.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<button class="js-container m-btn-no-style">
  <svg viewBox="0 0 32 32" class="c-burger">
    <path class="cb1" d="M 4,10 H 28 C 29.104,10 30,9.104 30,8 30,6.896 29.104,6 28,6 H 4 C 2.896,6 2,6.896 2,8 c 0,1.104 0.896,2 2,2 z"/>
    <path class="cb2" d="M 28,14 H 4 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 h 24 c 1.104,0 2,-0.896 2,-2 0,-1.104 -0.896,-2 -2,-2 z"/>
    <path class="cb3" d="M 28,22 H 4 c -1.104,0 -2,0.896 -2,2 0,1.104 0.896,2 2,2 h 24 c 1.104,0 2,-0.896 2,-2 0,-1.104 -0.896,-2 -2,-2 z"/>
  </svg>
</button>`;

const Base = BtnNoStyle(TriggerElMixin(BreakPointMixin(BaseShadowComponent)));

/**
 * Ce composant afficher une menu burger.
 *
 * @export
 * @class BurgerBase
 * @extends {Base}
 *
 * @prop {Boolean} [open=false] - le menu est il ouvert ?
 *
 */
export default class BurgerBase extends Base {
  static get properties() {
    return {
      open: { type: 'boolean' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addEventListener('click', this.handleOpen);
  }

  disconnectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.removeEventListener('click', this.handleOpen);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    if (name === 'open') this.setOpen();
  }

  setOpen() {
    this.open
      ? this.container.classList.add(`c-burger--open`)
      : this.container.classList.remove(`c-burger--open`);
  }

  handleOpen() {
    this.open = !this.open;
  }
}
