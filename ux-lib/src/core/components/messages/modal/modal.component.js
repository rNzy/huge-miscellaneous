import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import BtnNoStyle from '../../../mixins/styles/btnNoStyle.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BtnNoStyle(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-modal js-container" aria-hidden="true">
  <section class="c-modal__inner" aria-modal="true" role="dialog" aria-labelledby="modal-title" tabindex="-1">
    <div class="c-modal__header">
      <h1 id="modal-title">
        <slot name="modal-title"></slot>
        <slot name="title"></slot>
      </h1>
      <button class="c-modal__close-btn js-close-btn m-btn-no-style" aria-label="fermer cette fenêtre de dialogue">
        <ux-svg icon="cross" lib-size="modalico"></ux-svg>
      </button>
    </div>
    <div class="c-modal__body">
      <slot></slot>
    </div>
    <slot name="modal-footer"></slot>
    <slot name="footer"></slot>
  </section>

  <div class="c-modal__overlay"></div>
</div>
`;

const KEYCODE = {
  TAB_KEY: 9,
  ESCAPE: 27
};

const FOCUSABLE_ELEMENTS = [
  'a[href]:not([tabindex^="-"]):not([inert])',
  'area[href]:not([tabindex^="-"]):not([inert])',
  'input:not([disabled]):not([inert])',
  'select:not([disabled]):not([inert])',
  'textarea:not([disabled]):not([inert])',
  'button:not([disabled]):not([inert])',
  'iframe:not([tabindex^="-"]):not([inert])',
  'audio:not([tabindex^="-"]):not([inert])',
  'video:not([tabindex^="-"]):not([inert])',
  '[contenteditable]:not([tabindex^="-"]):not([inert])',
  '[tabindex]:not([tabindex^="-"]):not([inert])',
  '[role="dialog"]'
];

/**
 * Composant affichant une fenêtre modale ou un toast.
 *
 * Tips : Pour changer la taille de l'icone de fermeture il suffit de déclarer dans le css.
 * ```css
 * .c-modal__header .c-modal__close-btn {
 *   --size-svg: 15px;
 * }
 * ```
 *
 * @element ux-modal
 *
 * @prop {Boolean} [open] - ouvre la fenêtre modale
 * @prop {Boolean} [libOpen] - angularjs n'aime pas open et il n'aime pas que l'on change la valeur de la propriété depuis le composant.
 * @prop {String} focusBackElement - remet le focus sur cet élément ; si non précisé va chercher dans le dom une balise qui a l'attribut "target-id" égal à l'id de la modale.
 *
 * @prop {Function} closeModalCallBack - attache une fonction extérieure à la classe pour gérer la fermeture de la modale.
 * cf la doc ci-dessous sur angular js
 *
 * Pour faire fonctionner la modal dans anguler js :
 * Dans un fichier *.part.html
 * ```html
 * <ux-modal lib-open="{{vm.afficherPopup}}" id="modal">
 *   <span slot="modal-title">Mon titre</span>
 *   Mon message
 * </ux-modal>
 * <ux-btn
 *   model="primary"
 *   target-id="modal"
 *   ng-click="vm.afficherPopup = !vm.afficherPopup"
 * >
 *   Copier le numéro
 * </ux-btn>
 * ```
 *
 * Il faut noter l'id de la modal et le target-id du bouton.
 * Le target-id ne sert que pour donner le focus au bon élément à la fermeture.
 *
 * Et surtout il faut dans le controller fournir une fonction de callback à la fermeture
 * ```js
 * angular.module('domi.monmodule')
 *   .controller('moncontroller', moncontroller);
 *
 * // Ici le $element est important
 * function moncontroller($element, $state, $stateParams, $timeout, layoutService, config, $cordovaClipboard) {
 *   var vm = this;
 *   var modalEl = $element[0].querySelector('#modal'); // On selectionne la modale
 *   if (modalEl) {
 *     modalEl.closeModalCallBack = function() { vm.afficherPopup = !vm.afficherPopup } // on lui donne une fonction de fermeture
 *   }
 *
 * @slot modal-title(deprecated) @deprecated
 * @slot title
 * @slot default
 * @slot modal-footer(deprecated) @deprecated
 * @slot footer
 *
 * @export
 * @class ModalBase
 * @extends {BaseShadowComponent, BtnNoStyle, StackMixin}
 */
export default class ModalBase extends Base {
  static get properties() {
    return {
      open: { type: 'boolean' },
      libOpen: { type: 'boolean' },
      focusBackElement: { type: 'string' },
      iconSize: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.closeBtn = this.$.querySelector('.js-close-btn');
    this.overlay = this.$.querySelector('.c-modal__overlay');
    this.modal = this.$.querySelector('.c-modal__inner');

    this.sendClose = this.sendClose.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.focusableElementCollection = [];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'open') {
      this.open ? this._openModal() : this._closeModal();
      // AngularJS f***:!:: stuff
    } else if (name === 'lib-open') {
      this.libOpen ? this._openModal() : this._closeModal();
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.closeBtn.addEventListener('click', this.sendClose);
    this.overlay.addEventListener('click', this.sendClose);
    window.addEventListener('keydown', this.handleKeyUp);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.closeBtn.removeEventListener('click', this.sendClose);
    this.overlay.removeEventListener('click', this.sendClose);
    window.removeEventListener('keydown', this.handleKeyUp);
  }

  handleKeyUp(event) {
    if (
      (this.hasAttribute('lib-open') && !this.libOpen) ||
      (this.hasAttribute('open') && !this.open) ||
      event.altKey
    )
      return;

    switch (event.keyCode) {
      case KEYCODE.ESCAPE:
        this.sendClose();
        break;
      case KEYCODE.TAB_KEY:
        this._tabTrapping(event);
        break;
      default:
        return;
    }
  }

  /**
   * Cette fonction va soit fermer la modal soit appeler
   * la fonction closeModalCallBack si elle a été initialisée
   */
  sendClose() {
    if (this.closeModalCallBack) {
      this.closeModalCallBack();
    } else {
      this.open = false;
    }
  }

  _openModal() {
    this._getFocusableCollection(this);
    this.container.setAttribute('aria-hidden', 'false');
    this.container.classList.add('c-modal--open');
    this.modal.tabIndex = 0;
    this.modal.focus();
  }

  _closeModal() {
    this.container.setAttribute('aria-hidden', 'true');
    this.container.classList.remove('c-modal--open');
    this.modal.tabIndex = -1;

    this.focusableElementCollection = [];

    // renvoie le focus sur l'élément qui
    let focusBackElement = null;
    if (this.focusBackElement) {
      focusBackElement = document.querySelector(`#${this.focusBackElement}`);
    } else {
      focusBackElement = document.querySelector(`[target-id="${this.id}"`);
    }

    if (focusBackElement) {
      focusBackElement.tabIndex = -1;
      focusBackElement.focus();
      focusBackElement.tabIndex = '';
    }
  }

  // récupère une liste d'élément focusables
  _focusableElements(context) {
    return context.querySelectorAll(FOCUSABLE_ELEMENTS);
  }

  // récupère les éléments focusable de chaque éléments
  // enfant
  _getChildrenFocusableElements(context) {
    const children = Array.from(context.children);
    if (children) {
      children.forEach(element => {
        if (element.children) {
          this._getChildrenFocusableElements(element);
        }
        if (element.$) {
          const collection = Array.from(this._focusableElements(element.$));
          if (collection.length < 1) return;
          this.focusableElementCollection = this.focusableElementCollection.concat(
            collection
          );
        }
      });
    }
  }

  // récupère les éléments focusable dans le shadow dom du
  // composant modal
  // instancie getChildrenFocusableElements pour récupérer les
  // éléments focusable des enfants de cette modal.
  _getFocusableCollection(context) {
    const modalFocusableArray = [
      ...context.$.querySelectorAll(FOCUSABLE_ELEMENTS)
    ];

    this._getChildrenFocusableElements(context);
    this.focusableElementCollection = [
      ...modalFocusableArray,
      ...this.focusableElementCollection
    ];
  }

  // méthode de tab trapping instancié sur l'évènement keydown
  // de la touche tab.
  _tabTrapping(event) {
    const focusableChildren = this.focusableElementCollection;
    const activeHost = document.activeElement;
    const focusedItemIndex = focusableChildren.indexOf(
      activeHost.shadowRoot.activeElement
    );

    if (focusedItemIndex === 0 && event.shiftKey) {
      focusableChildren[focusableChildren.length - 1].focus();
      event.preventDefault();
    } else if (
      focusedItemIndex === focusableChildren.length - 1 &&
      !event.shiftKey
    ) {
      focusableChildren[0].focus();
      event.preventDefault();
    }
  }
}
