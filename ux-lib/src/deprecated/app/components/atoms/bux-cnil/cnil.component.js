import BuxClass from '../../../../bux.class';

import './cnil.styles.scss';

customElements.define(
  'bux-cnil',
  class Cnil extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;

      this.style.display = 'none';
      this.link =
        this.getAttribute('data-link') || '/public/donneesPersonnelles/';

      this.content =
        this.getAttribute('data-content') ||
        `En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies, notamment pour
       nous permettre d'améliorer nos contenus et vous proposer des services adaptés. Pour en savoir plus <a
       class="c-cnil-a"
       href="${this.link}"
       aria-label="Afficher la page sur vos données personnelles"
     >
       cliquer ici.
     </a>`;

      this.cookieName =
        this.getAttribute('data-cookie-name') || 'trackingAccepted';
      this.cookieDuration = this.getAttribute('data-cookie-duration') || '365';
      this.cookiePath = this.getAttribute('data-cookie-path') || '/';

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = `
        <aside class="c-cnil-wrapper">
          <p class="c-cnil-p">
            ${this.content}
          </p>
          <button class="c-cnil-button" aria-label="Accepter les cookies et poursuivre votre navigation sur ce site">J'accepte</button>
        </aside>
      `;

      this.btn = tpl.content.querySelector('.c-cnil-button');
      this.wrap = tpl.content.querySelector('.c-cnil-wrapper');

      this.initCnil();

      // Insert your element in the dom
      this.appendChild(tpl.content);
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
      this.style.display = '';

      this.wrap.classList.add('is-visible');

      this.btn.addEventListener('click', () => {
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
      this.wrap.classList.remove('is-visible');
      setTimeout(() => {
        this.style.display = 'none';
      }, 400);
    }
  }
);
