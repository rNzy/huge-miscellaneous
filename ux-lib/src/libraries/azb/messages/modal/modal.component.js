import ModalBase from '../../../../core/components/messages/modal/modal.component';
import styleDefault from './modal.style.css';

/**
 * Display an modal dialog
 */
class Modal extends ModalBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-modal', Modal);
