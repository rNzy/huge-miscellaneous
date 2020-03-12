import InputBase from '../../../../core/components/formulaires/inputs/input.component.js';

/**
 * Composant de base non fonctionnel permettant aux composants ux-input-foo de créer un élément input correspondant.
 */
class Input extends InputBase {}

customElements.define('ux-input', Input);
