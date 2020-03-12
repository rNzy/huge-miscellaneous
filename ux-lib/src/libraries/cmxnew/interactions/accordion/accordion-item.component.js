import AccordionItemBase from '../../../../core/components/interactions/accordion/accordion-item.component';
import styleDefault from './accordion.style.css';

/**
 * Composant affichant un accordéon qui s'ouvre ou se ferme pour dévoiler/masquer du contenu.
 */
class AccordionItem extends AccordionItemBase {
  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
  }
}

customElements.define('ux-accordion-item', AccordionItem);
