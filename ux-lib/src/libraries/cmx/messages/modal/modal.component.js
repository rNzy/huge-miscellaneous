import ModalBase from '../../../../core/components/messages/modal/modal.component';
import styleDefault from './modal.style.css';

/**
 * Display an modal dialog
 */
const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-modal js-container" aria-hidden="true">
  <section class="c-modal__inner" aria-modal="true" role="dialog" aria-labelledby="modal-title" tabindex="-1">
    <div class="c-modal__header">
      <h1 class="c-modal__title" id="modal-title">
        <slot name="modal-title"></slot>
      </h1>
      <button class="c-modal__close-btn js-close-btn m-btn-no-style" aria-label="fermer cette fenêtre de dialogue">
        <ux-svg icon="cross" lib-size="xs" class="c-modal__close-svg"></ux-svg>
      </button>
    </div>
    <div class="c-modal__body">
      <slot></slot>
    </div>
    <div class="c-modal__footer">
      <slot name="modal-footer"></slot>
    </div>
  </section>

  <div class="c-modal__overlay"></div>
</div>
`;

/**
 * Display an modal dialog
 */
class Modal extends ModalBase {
  template() {
    return tpl;
  }
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-modal', Modal);
