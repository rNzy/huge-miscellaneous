import VirtualisBase from '../../../../core/components/miscellaneous/virtualis/virtualis.component';

/**
 * @export
 * @class PatchBase
 * @extends {Base}
 *
 * @prop {Boolean} shadow - Attribut permettant d'ajouter une ombre au patch
 * @prop {String} lib-bg-color - Attribut permettant de modifier la couleur de fond au patch
 */
export default class Virtualis extends VirtualisBase {}

customElements.define('ux-virtualis', Virtualis);
