import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML = `
<aside class="c-cnil js-container">
<p class="c-cnil__content"><slot></slot></p>
<button class="c-cnil__button" aria-label="Accepter les cookies et poursuivre votre navigation sur ce site">J'accepte</button>
</aside>
`;

/**
 * @export
 * @class CnilBase
 * @extends {Base}
 *
 * @prop {String} [cookieName="trackingAccepted"] - définit le nom du cookie
 * @prop {Number} [cookieDuration=365] - définit la durée du cookie
 * @prop {String} [cookiePath="/"] - définit le chemin du cookie
 */

export default class CnilBase extends Base {
  static get properties() {
    return {
      cookieName: {
        type: 'string',
        defaultValue: 'trackingAccepted'
      },
      cookieDuration: {
        type: 'number',
        defaultValue: '365'
      },
      cookiePath: {
        type: 'string',
        defaultValue: '/'
      }
    };
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.style.display = 'none';
    this.initCnil();
  }

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return false;
  }

  deleteCookie(cname) {
    document.cookie = cname + '=false; Max-Age=-99999999;';
  }

  setCookie(cname, cvalue, exdays, cpath, cdomain = null) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();

    let cookieTmp = cname + '=' + cvalue + ';' + expires + ';path=' + cpath;
    if (cdomain) {
      cookieTmp += ';domain=' + cdomain;
    }

    document.cookie = cookieTmp;
  }

  initCnil() {
    const cookie = this.getCookie(this.cookieName);
    if (!cookie || cookie !== 'true') this.show();
  }

  gtmUpdate(w, l) {
    w[l] = w[l] || [];
    w[l].push({ event: 'click-accept-tracking' });
  }

  show() {
    const btn = this.$.querySelector('.c-cnil__button');
    this.style.display = '';

    this.container.classList.add('is-visible');

    btn.addEventListener('click', () => {
      this.setCookie(
        this.cookieName,
        'true',
        this.cookieDuration,
        this.cookiePath
      );
      this.gtmUpdate(window, 'dataLayer');
      this.hide();
    });
  }

  hide() {
    this.container.classList.remove('is-visible');
    setTimeout(() => {
      this.style.display = 'none';
    }, 400);
  }
}
