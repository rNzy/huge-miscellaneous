import LogoBase from '../../../../core/components/navigations/logo/logo.component';

/**
 * @export
 * @class Logo
 * @extends {LogoBase}
 *
 * @prop {Boolean} center - centrer le logo
 */
export default class Logo extends LogoBase {}

customElements.define('ux-logo', Logo);
