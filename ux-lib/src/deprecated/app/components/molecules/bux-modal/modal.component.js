import BuxClass from '../../../../bux.class';
import './modal.styles.scss';

// import '../bux-btn-group/btn-group.component';
// import '../../atoms/bux-btn/btn.component';
// import '../../atoms/bux-svg/svg.component';

window.customElements.define(
  'bux-modal',
  class extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
      // Check if event was removed
      this.isEventRemove = true;

      // Event for close on cross click or on click overley
      this.clickCrossEventHandler = this.clickCrossEvent.bind(this);
      this.clickOverlayEventHandler = this.clickOverlayEvent.bind(this);

      this.keyUpTabEventHandler = this.keyUpTabEvent.bind(this);

      // Loop focus in modal
      this.loopFocusEventHandler = this.loopFocusEvent.bind(this);
    }

    //////////////// Life Cycle
    // Component is unmount
    disconnectedCallback() {
      this.removeCloseEvents();
    }

    //////// Methodes
    open() {
      this.visible = true;
      this.setVisibleOrNot();
    }

    close() {
      this.visible = false;
      this.setVisibleOrNot();
      this.resolve('Closed!');
    }

    // Remove modal
    destroy() {
      this.removeCloseEvents();
      this.innerHTML = '';
      this.isInit = false;
      if (this.focusBackElement) this.focusBackElement.focus();
    }

    update() {
      this.removeCloseEvents();
      this.setLabel();
      this.setContent();
      this.setBtn();
      this.setCross();
      this.setType();
      this.modalFirst.focus();
    }

    init({
      label,
      content,
      labelFailure,
      labelSuccess,
      type,
      onFailure,
      onSuccess,
      closable,
      autoOpen,
      focusBackElement
    }) {
      this.destroy();

      // Init
      this.label = label || '';
      this.content = content || '';
      this.labelFailure = labelFailure || '';
      this.labelSuccess = labelSuccess || '';
      this.onFailure = onFailure;
      this.onSuccess = onSuccess;
      this.type = type || 'modal';
      this.closable = closable !== false;
      this.autoOpen = autoOpen !== false;
      this.visible = false;

      if (focusBackElement instanceof Element) {
        this.focusBackElement = focusBackElement;
      } else if (typeof focusBackElement === 'string') {
        this.focusBackElement =
          document.querySelector(focusBackElement) || false;
      }

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Select Element
      this.modalWrapEl = tpl.content.querySelector('.c-modal-wrapper');
      this.modal = tpl.content.querySelector('.c-modal');
      this.modalHeader = tpl.content.querySelector('.c-modal__header');
      this.labelEl = tpl.content.querySelector('.c-modal__label');
      this.contentEl = tpl.content.querySelector('.c-modal__content');
      this.btnsEl = tpl.content.querySelector('.c-modal__btns');

      // Select Dom Element out of bux-modal for
      // accessibility
      this.navbar = document.querySelector('novatio-navbar');
      this.header = document.querySelector('novatio-header');
      this.footer = document.querySelector('bux-footer');
      this.main = document.querySelector('novatio-page');
      this.modalFirst = tpl.content.querySelector('.c-modal-first');
      this.modalLast = tpl.content.querySelector('.c-modal-last');

      this.setLabel();
      this.setContent();
      this.setBtn();
      this.setCross();
      this.setType();
      this.setPClass();

      // Insert it in dom
      this.appendChild(tpl.content);

      if (this.closable) {
        this.crossEl = this.querySelector('.c-modal__close');
        this.crossEl.addEventListener('click', this.clickCrossEventHandler);
      }

      // I need this for animation but
      // BADDDDDDDDDDDDDDDDD
      if (this.autoOpen) {
        setTimeout(() => this.open(), 50);
      }

      this.isInit = true;
      return new Promise(resolve => {
        this.resolve = resolve;
      });
    }

    setPClass() {
      this.contentEl.querySelectorAll('p').forEach(p => {
        p.classList.add('c-modal__text');
      });
    }

    setLabel() {
      this.labelEl.textContent = this.label;
    }

    setContent() {
      this.contentEl.innerHTML = this.content;
    }

    setBtn() {
      this.btnsEl.innerHTML = `${
        this.labelFailure || this.labelSuccess
          ? `<bux-btn-group>
            ${
              this.labelFailure
                ? `<bux-btn class="c-modal-btn-failure" type="secondary">${this.labelFailure}</bux-btn>`
                : ''
            }
            ${
              this.labelSuccess
                ? `<bux-btn class="c-modal-btn-success">${this.labelSuccess}</bux-btn>`
                : ''
            }
          </bux-btn-group>`
          : ''
      }`;

      const buxBtnGroup = this.btnsEl.querySelector('bux-btn-group');
      if (buxBtnGroup) {
        if (this.labelFailure) {
          this.koBtn = this.btnsEl.querySelector('.c-modal-btn-failure');
          if (this.onFailure) {
            this.koBtn.onclick = this.onFailure;
          }
        }
        if (this.labelSuccess) {
          this.okBtn = this.btnsEl.querySelector('.c-modal-btn-success');
          if (this.onSuccess) {
            this.okBtn.onclick = this.onSuccess;
          }
        }
      }
    }

    setCross() {
      if (this.closable) {
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('c-modal__close');
        closeBtn.innerHTML =
          '<bux2-svg icon="cross" size="xs" aria-hidden="true"></bux2-svg>';
        closeBtn.setAttribute(
          'aria-label',
          'Cliquer ici pour fermer cette fenêtre de dialogue'
        );
        const referenceNode = this.modalHeader;
        referenceNode.parentNode.insertBefore(
          closeBtn,
          referenceNode.nextSibling
        );
        this.addCloseEvents();
      }
    }

    saveAttribute(el, attribute) {
      // Don't save if already
      if (el.hasAttribute('save-' + attribute)) return;

      if (el.hasAttribute(attribute)) {
        el.setAttribute('save-' + attribute, el.getAttribute(attribute));
      }
    }

    restoreAttribute(el, attribute, newval) {
      if (el.hasAttribute('save-' + attribute)) {
        el.setAttribute(attribute, el.getAttribute('save-' + attribute));
        el.removeAttribute('save-' + attribute);
        return true;
      }
      if (newval) {
        el.setAttribute(attribute, newval);
      }
      return false;
    }

    hideEl(el) {
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }

      if (el instanceof Element) {
        this.saveAttribute(el, 'aria-hidden');
        el.setAttribute('aria-hidden', 'true');

        this.saveAttribute(el, 'tabindex');
        el.setAttribute('tabindex', '-1');
      }
    }

    unHideEl(el) {
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }

      if (el instanceof Element) {
        if (!this.restoreAttribute(el, 'aria-hidden'))
          el.removeAttribute('aria-hidden');
        if (!this.restoreAttribute(el, 'tabindex'))
          el.removeAttribute('tabindex');
      }
    }

    removeHideToAllParents(el) {
      if (el && el.parentElement) {
        this.unHideEl(el.parentElement);
        this.removeHideToAllParents(el.parentElement);
      }
    }

    setVisibleOrNot() {
      if (this.visible) {
        // Modal is visible now
        this.setAttribute('visible', 'true');

        this.modalWrapEl.classList.add('c-modal-visible');
        this.modalWrapEl.classList.add('is-visible');
        this.modal.classList.add('c-modal-visible');

        // Remove hidden to all Element outside main
        this.hideEl('bux-skip-nav');
        this.hideEl(this.navbar);
        this.hideEl(this.header);
        this.hideEl(this.footer);

        if (this.main) {
          // Set aria-hidden to all child of main exept
          // if is modal or child element of modal
          this.main.querySelectorAll('*').forEach(item => {
            if (item !== this && !this.contains(item)) {
              this.hideEl(item);
            }
          });
        }

        this.removeHideToAllParents(this);

        setTimeout(() => {
          const label = document.querySelector('.c-modal__label');
          label.focus();
        }, 50);

        // Bind a focus event listener to the body element to make sure the focus
        // stays trapped inside the dialog while open
        document.body.addEventListener(
          'focus',
          this.loopFocusEventHandler,
          true
        );
      } else {
        // Modal is not visible now
        this.setAttribute('visible', 'false');

        this.modalWrapEl.classList.remove('c-modal-visible');
        this.modalWrapEl.classList.remove('is-visible');
        this.modal.classList.remove('c-modal-visible');

        // Remove hidden to all Element outside main
        this.unHideEl('bux-skip-nav');
        this.unHideEl(this.navbar);
        this.unHideEl(this.header);
        this.unHideEl(this.footer);

        if (this.main) {
          // Remove aria-hidden to all child of main exept
          // if is modal or child element of modal
          this.main.querySelectorAll('*').forEach(item => {
            if (item !== this && !this.contains(item)) {
              this.unHideEl(item);
            }
          });
        }

        // remove bind focus to trapped into modal
        document.body.removeEventListener(
          'focus',
          this.loopFocusEventHandler,
          true
        );

        // Focus back
        if (this.focusBackElement) {
          setTimeout(() => {
            this.focusBackElement.focus();
          }, 50);
        }
      }
    }

    setType() {
      if (this.type === 'toast') {
        this.modalWrapEl.classList.add('c-modal-wrapper__toast');
        this.modal.classList.add('c-modal__toast');
      } else {
        this.modalWrapEl.classList.add('c-modal-wrapper__modal');
        this.modal.classList.add('c-modal__modal');
      }
    }

    //////////// EVENT
    addCloseEvents() {
      if (!this.isEventRemove) return;
      this.modalWrapEl.addEventListener('click', this.clickOverlayEventHandler);
      // this.crossElAy11.addEventListener('click', this.clickCrossEventHandler);

      window.addEventListener('keyup', this.keyUpTabEventHandler);
      this.isEventRemove = false;
    }

    removeCloseEvents() {
      if (this.isEventRemove) return;
      this.modalWrapEl.removeEventListener(
        'click',
        this.clickOverlayEventHandler
      );
      this.crossEl.removeEventListener('click', this.clickCrossEventHandler);
      window.removeEventListener('keyup', this.keyUpTabEventHandler);
      this.isEventRemove = true;
    }

    clickOverlayEvent(e) {
      if (e.target === this.modalWrapEl) this.close();
    }

    clickCrossEvent() {
      this.close();
    }

    keyUpTabEvent(e) {
      if (e.which === 27) this.close();
    }

    loopFocusEvent(event) {
      // If the dialog is shown and the focus is not within the dialog element,
      // move it back to its first focusable child
      if (this.visible && !this.contains(event.target)) {
        // Put the focus to the first element
        this.modalFirst.focus();
      }
    }
    ///////////////////

    template() {
      return `
      <div class="c-modal-wrapper" role="dialog" aria-modal="true">
          <div class="c-modal">
            <div class="u-hidden-visually c-modal-first" tabindex="0">Début de la fenêtre modale</div>
            <div class="c-modal__header">
              <h2 class="c-modal__label" tabindex="0"></h2>
            </div>
            <div class="c-modal__content">
            </div>
            <div class="c-modal__btns">
            </div>
            <div class="u-hidden-visually c-modal-last" tabindex="0">Fin de la fenêtre modale</div>
          </div>
      </div>
    `;
    }
  }
);
