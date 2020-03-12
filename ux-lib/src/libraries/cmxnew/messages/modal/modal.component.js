import ModalBase from '../../../../core/components/messages/modal/modal.component';
import styleDefault from './modal.style.css';

/**
 * Composant affichant une fenêtre modale ou un toast.
 */
class Modal extends ModalBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-modal', Modal);
