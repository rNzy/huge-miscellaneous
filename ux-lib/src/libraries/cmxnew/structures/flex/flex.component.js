import FlexBase from '../../../../core/components/structures/flex/flex.component';

/**
 * Aligne ses éléments enfants en utilisant flexbox. Par défaut, les options flex utilisées sont row wrap flex-start et center.
 */
class Flex extends FlexBase {}

customElements.define('ux-flex', Flex);
