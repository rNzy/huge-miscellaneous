/* eslint-disable max-lines */
import BuxClass from '../../../../bux.class';
import './header.styles.scss';

customElements.define(
  'bux-header',
  class Header extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    static get observedAttributes() {
      return [
        'data-label',
        'data-message',
        'data-connected',
        'type',
        'data-mobile-state',
        'data-gender',
        'data-first-name',
        'data-last-name',
        'data-last-connection',
        'data-espace',
        'active',
        'data-back-link'
      ];
    }

    attributeChangedCallback(name, oldVal, newValue) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newValue;

      if (!this.isInit) return;

      switch (name) {
        case 'data-label':
          this.changeLabel();
          break;
        case 'data-message':
          this.changeMsg();
          break;
        case 'data-connected':
          this.toggleLogin();
          break;
        case 'type':
          this.changeType();
          break;
        case 'data-mobile-state':
          this.changeMobileState();
          break;
        case 'data-gender':
        case 'data-first-name':
        case 'data-last-name':
        case 'data-last-connection':
          this[camelName] = this.initVar(name, newValue);
          this.changeProfile();
          break;
        case 'data-espace':
          this.espace = this.initVar('data-espace', newValue);
          this.changeEspace();
          break;
        case 'active':
          this.changeActive();
          break;
        case 'data-back-link':
          this.backLink =
            newValue === 'false' || newValue === '' ? false : newValue;
          this.changeBackLink();
          break;
      }
    }

    connectedCallback() {
      if (this.isInit) return;
      this.gender = this.initVar('data-gender');
      this.firstName = this.initVar('data-first-name');
      this.lastName = this.initVar('data-last-name');
      this.lastConnection = this.initVar('data-last-connection');
      this.espace = this.initVar('data-espace', false);
      this.connected = this.initVar('data-connected', false);
      this.active = this.initVar('active', false);
      this.backLink = this.initVar('data-back-link', false);
      this.settingsLink = this.initVar('data-settings-link', false);
      this.linkConnect = this.initVar('data-link-connect');
      this.linkUnconnect = this.initVar('data-link-unconnect');
      this.type = this.initVar('type', 'default');
      this.label = this.initVar('data-label', false);

      const tpl = document.createElement('template');
      tpl.innerHTML = this.render();

      this.selector(tpl);

      this.toChangeEl = [
        this.wrapProfil,
        this.wrapEspace,
        this.wrapConseiller,
        this.wrapParam
      ];

      this.changeProfile();
      this.changeEspace();
      this.changeLabel();
      this.changeMsg();
      this.toggleLogin();
      this.changeType();
      this.changeActive();
      this.changeBackLink();

      this.appendChild(tpl.content);
      this.isInit = true;
    }

    initVar(name, value) {
      if (!this.hasAttribute(name)) {
        if (typeof value === 'undefined') {
          this.setAttribute(name, '');
          return '';
        } else if (value === false) {
          this.setAttribute(name, 'false');
          return false;
        }
        this.setAttribute(name, value);
        return value;
      } else if (this.getAttribute(name) === 'false') {
        return false;
      }
      return this.getAttribute(name);
    }

    selector(tpl) {
      this.wLogo = tpl.content.querySelector('.c-header-wrap-logo');
      this.labelElm = tpl.content.querySelector('.c-header-wrap-label');
      this.msgElm = tpl.content.querySelector('.c-header-wrap-message');
      this.msgAElm = tpl.content.querySelector('.c-header-a-message');
      this.aLogin = tpl.content.querySelector('.c-header-a-login');
      this.liLogin = tpl.content.querySelector('.c-header-wrap-login');
      this.wrapEspace = tpl.content.querySelector('.c-header-wrap-espace');
      this.wrapProfil = tpl.content.querySelector('.c-header-wrap-profile');
      this.wrapConseiller = tpl.content.querySelector(
        '.c-header-wrap-mon-conseiller'
      );
      this.wrapParam = tpl.content.querySelector('.c-header-wrap-param');
      this.backLinkEl = tpl.content.querySelector('.c-header-back-link');

      this.menuBtnMobile = tpl.content.querySelector(
        '.c-header-li-menu-mobile'
      );

      this.titleMobile = tpl.content.querySelector('.c-header-li-title-mobile');

      this.rightBtnMobile = tpl.content.querySelector(
        '.c-header-right-svg-mobile'
      );
    }

    changeMobileState() {
      const hM = this.querySelector('#c-header-mobile');
      if (this.mobileState === 'menu-open') {
        hM.classList.add('is-open');
      } else {
        hM.classList.remove('is-open');
      }
    }

    changeTypePublic() {
      this.wLogo.style.borderRight = 'none';
      this.liLogin.style.marginLeft = 'auto';
      this.liLogin.style.borderLeft = 'solid 1px #efefef';
      this.menuBtnMobile.style.display = 'none';
      this.titleMobile.style.margin = '0 auto';
      this.rightBtnMobile.setAttribute('data-icon', 'connexion');

      this.rightBtnMobile.parentElement.classList.add(
        'c-header-btn-public-mobile'
      );

      this.rightBtnMobile.parentElement.setAttribute(
        'aria-label',
        'Se connecter'
      );

      this.rightBtnMobile.parentElement.setAttribute('title', 'Se connecter');

      this.rightBtnMobile.parentElement.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = this.linkConnect;
        return false;
      });
    }

    changeTypePseudoAuth() {
      this.wLogo.style.borderRight = 'none';
      this.wLogo.classList.add('is-empty');
      this.liLogin.style.marginLeft = 'auto';
      this.liLogin.style.borderLeft = 'solid 1px #efefef';
      this.menuBtnMobile.style.display = 'none';
      this.titleMobile.style.margin = '0 auto';
      this.rightBtnMobile.setAttribute('data-icon', 'connexion');

      this.rightBtnMobile.parentElement.classList.add(
        'c-header-btn-public-mobile'
      );

      this.rightBtnMobile.parentElement.setAttribute(
        'aria-label',
        'Se connecter'
      );

      this.wLogo
        .querySelector('.c-header__logo-container')
        .addEventListener('click', e => {
          e.stopPropagation();
          e.preventDefault();
          return false;
        });

      this.rightBtnMobile.parentElement.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = this.linkConnect;
        return false;
      });

      this.rightBtnMobile.parentElement.setAttribute('title', 'Se connecter');

      this.rightBtnMobile.parentElement.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = this.linkConnect;
        return false;
      });
    }

    changeType() {
      this.toChangeEl.forEach(item => {
        if (!item) return;
        if (
          this.type === 'empty' ||
          this.type === 'public' ||
          this.type === 'pseudoauth'
        ) {
          item.style.display = 'none';
        } else {
          item.removeAttribute('style');
        }
      });

      if (this.type === 'empty') {
        this.wLogo.style.borderRight = 'none';
        this.liLogin.style.marginLeft = 'auto';
        this.liLogin.style.borderLeft = 'solid 1px #efefef';
      } else if (this.type === 'public') {
        this.changeTypePublic();
      } else if (this.type === 'pseudoauth') {
        this.changeTypePseudoAuth();
      } else {
        this.wLogo.removeAttribute('style');
        this.liLogin.removeAttribute('style');
      }
    }

    toggleLogin() {
      if (this.isTrue(this.connected) && this.type !== 'public') {
        this.aLogin.href = this.linkUnconnect;
        this.aLogin.title = 'Déconnexion';
        this.aLogin.setAttribute('aria-label', 'Déconnexion');
      } else {
        this.aLogin.href = this.linkConnect;
        this.aLogin.title = 'Connexion';
        this.aLogin.setAttribute('aria-label', 'Connexion');
      }
    }

    changeLabel() {
      if ('' == this.label || 'false' == this.label || 'null' == this.label) {
        this.labelElm.innerHTML = '';
      } else {
        this.labelElm.innerHTML = `<h1 class="c-header-wrap-label-h1">${this.label}</h1>`;
      }
    }

    changeMsg() {
      if ('' == this.message || 'false' == this.message) {
        this.msgElm.innerHTML = '';
        this.msgAElm.setAttribute(
          'aria-label',
          'Mon conseiller : Messagerie, contacts, prise de rendez-vous'
        );
      } else {
        this.msgElm.innerHTML = `<span class="c-header-message">${this.message}</span>`;
        this.msgAElm.setAttribute(
          'aria-label',
          `Visitez lien mon conseiller, ma messagerie, vous avez ${this.message} messages non lus`
        );
      }
    }

    changeEspace() {
      if (this.espace) {
        this.wrapEspace.removeAttribute('aria-hidden');
        this.wrapEspace.classList.remove('is-empty');
        this.wrapEspace.innerHTML = `
          <a href="/espace/filter" aria-label="Changer d'espace. L'espace actuel est : ${this.espace}" title="Changer d'espace" class="c-header-a">
            <div class="c-header-a-div c-header-a-div-space-bt">
              <div class="c-header-espace-name">${this.espace}</div>
              <bux-svg class="c-header-espace-ico" data-icon="switcher"></bux-svg>
            </div>
          </a>`;
      } else {
        this.wrapEspace.innerHTML = '';
        this.wrapEspace.setAttribute('aria-hidden', 'true');
        this.wrapEspace.classList.add('is-empty');
      }
    }

    changeActive() {
      [
        this.wrapProfil,
        this.wrapEspace,
        this.wrapConseiller,
        this.wrapParam
      ].forEach(item => item.classList.remove('is-active'));

      switch (this.active) {
        case 'profil':
          this.wrapProfil.classList.add('is-active');
          break;
        case 'espace':
          this.wrapEspace.classList.add('is-active');
          break;
        case 'conseiller':
          this.wrapConseiller.classList.add('is-active');
          break;
        case 'parametrage':
          this.wrapParam.classList.add('is-active');
          break;
      }
    }

    changeProfile() {
      if (
        this.gender === false &&
        this.firstName === false &&
        this.lastName === false &&
        this.lastConnection === false
      ) {
        this.wrapProfil.innerHTML = '';
        this.wrapProfil.setAttribute('aria-hidden', 'true');
        this.wrapProfil.classList.add('is-empty');
        this.wrapProfil.classList.add('c-header-no-border');
      } else {
        const ariaLabel = `Connecté en tant que ${
          this.gender ? this.gender : ''
        } ${this.firstName ? this.firstName : ''} ${
          this.lastName ? this.lastName : ''
        }, ${
          this.lastConnection ? this.lastConnection : ''
        }, accédez à votre profil`;

        this.wrapProfil.innerHTML = `
          <a href="/profil" aria-label="${ariaLabel}" title="Modifier mon profil" class="c-header-a c-header-a-profil">
            <div class="c-header-a-profil__img">
              <bux2-image src="profil.png" aria-hidden="true" width="32" height="32"></bux2-image>
            </div>
            <div class="c-header-a-div c-header-a-div-space-bt c-header-div-1" aria-hidden="true">
              <div class="c-header-div-2" aria-hidden="true">
                <div class="c-header-profile-name" aria-hidden="true">${
                  this.gender ? this.gender : ''
                } ${this.firstName ? this.firstName : ''} ${
          this.lastName ? this.lastName : ''
        }
                <bux-svg data-icon="pen-wo-circle" aria-hidden="true"></bux-svg>
            </div>
              <div class="c-header-profile-date" aria-hidden="true">${
                this.lastConnection ? this.lastConnection : ''
              }</div>
              </div>
            </div>
          </a>`;
        this.wrapProfil.classList.remove('is-empty');
        this.wrapProfil.removeAttribute('aria-hidden');
        this.wrapProfil.classList.remove('c-header-no-border');
      }
    }

    changeBackLink() {
      if (this.backLink) {
        this.backLinkEl.style.display = '';
        this.backLinkEl.href = this.backLink;
      } else {
        this.backLinkEl.style.display = 'none';
        this.backLinkEl.href = '';
      }
    }

    render() {
      return `
      <header class="c-header" role="banner">
        ${this.templateDesktop()}
        ${this.templateMobile()}
      </header>
      `;
    }

    templateDesktop() {
      return `
        <div id="c-header-desktop">
          <ul class="c-header-ul">
            <li class="c-header-li c-header-wrap-logo">
              <a href="/" aria-label="Aller à l'accueil" title="Accueil" class="c-header__logo-container">
                <bux-svg data-icon="logo" data-class="c-header__logo-svg"></bux-svg>
              </a>
            </li>
            <li class="c-header-li c-header-wrap-profile"></li>
            <li class="c-header-li c-header-wrap-espace"></li>
            <li class="c-header-li c-header-no-border-bottom c-header-wrap-mon-conseiller">
              <a href="/messagerie/" title="Mon conseiller, ma messagerie" class="c-header-a c-header-a-message">
                <div class="c-header-a-div">
                  <bux-svg data-icon="conseiller" class="c-header-ico"></bux-svg>
                  <div>
                    <div class="c-header-item-conseiller"><span class="c-header-item-con">MON CONSEILLER</span><span class="c-header-wrap-message"></span></div>
                    <div class="c-header-item-subtitle">Messagerie, contacts, prise de rendez-vous</div>
                  </div>
                </div>
              </a>
            </li>
            <li class="c-header-li c-header-no-border-bottom c-header-wrap-param">
              <a href="${this.settingsLink}" aria-label="Paramétrage. Gérer ma sécurité bancaire, mes alertes" title="Paramétrage" class="c-header-a">
                <div class="c-header-a-div">
                  <bux-svg data-icon="engrenage" class="c-header-ico"></bux-svg>
                  <div>
                    <div class="c-header-item-title">PARAMÉTRAGE</div>
                    <div class="c-header-item-subtitle">Gérer ma sécurité bancaire, mes alertes</div>
                  </div>
                </div>
              </a>
            </li>
            <li class="c-header-li c-header-no-border-bottom c-header-wrap-login">
              <a aria-label="Déconnexion" title="Déconnexion" class="c-header-a c-header-a-login" href="${this.linkUnconnect}" >
                <div class="c-header-a-div">
                  <bux-svg data-icon="connexion" class="c-header-ico"></bux-svg>
                  <div>
                    <div class="c-header-item-title">DÉCONNEXION</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>`;
    }

    templateMobile() {
      return `
      <div id="c-header-mobile">
        <ul class="c-header-ul">
          <li class="c-header-li c-header-li-menu-mobile">
            <button id="header-btn-menu" class="c-header-btn" aria-label="Afficher le menu">
              <bux-svg data-icon="trigger" data-class="c-header-ico"></bux-svg>
            </button>
            <a class="c-header-back-link" aria-label="revenir à l'étape précédente">
              <bux-svg data-icon="back-link" data-class="c-header-ico"></bux-svg>
            </a>
          </li>
          <li class="c-header-li c-header-li-title-mobile">
            <div class="c-header-wrap-label"></div>
            <bux-svg data-icon="logo" data-class="c-header__logo-svg-mobile"></bux-svg>
          </li>
          <li class="c-header-li c-header-ico">
            <button id="header-btn-profil" aria-label="Mon profil" class="c-header-btn">
              <bux-svg class="c-header-right-svg-mobile" data-icon="user-circle"></bux-svg>
            </button>
          </li>
      </div>
      `;
    }
  }
);
