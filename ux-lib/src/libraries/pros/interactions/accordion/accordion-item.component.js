import AccordionItemBase from '../../../../core/components/interactions/accordion/accordion-item.component';
import styleDefault from './accordion.style.css';

/**
 * This is a simple button
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
