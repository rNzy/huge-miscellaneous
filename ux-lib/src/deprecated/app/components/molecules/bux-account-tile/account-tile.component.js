import './account-tile.styles.scss';
//import { browserstack } from 'launchpad';
customElements.define(
  'bux-account-tile',

  class AccountTile extends HTMLElement {
    //CE QUE JE REGARDE COMME ATTRIBUTS
    static get observedAttributes() {
      return [
        'data-account-model',
        'data-account-switch-account-id-btn',
        'data-account-type',
        'data-account-label',
        'data-account-label-level',
        'data-account-brand',
        'data-account-holder',
        'data-account-coholder',
        'data-account-details',
        'data-account-details-to-come-up',
        'data-account-details-number-of-versements',
        'data-account-details-amount-scheduled-payment',
        'data-account-details-amount-scheduled-currency',
        'data-account-details-amount-scheduled-payment-period',
        'data-account-amount',
        'data-account-currency',
        'data-account-link-transfert-url',
        'data-account-link-url',
        'data-updated-on',
        'shadow'
      ];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    //JE RECUP LES ATTRIBUTS ET LES AJOUTE DANS LE TEMPLATE
    connectedCallback() {
      if (this.isInit) return;
      this.model = this.getAttribute('data-account-model');
      this.linkBtnSwitch = this.getAttribute(
        'data-account-switch-account-id-btn'
      );
      this.type = this.getAttribute('data-account-type');
      this.label = this.getAttribute('data-account-label');
      this.labelLevel = this.getAttribute('data-account-label-level');
      this.brand = this.getAttribute('data-account-brand');
      this.holder = this.getAttribute('data-account-holder');
      this.coholder = this.getAttribute('data-account-coholder');
      this.details = this.getAttribute('data-account-details');
      this.detailsToComeUp = this.getAttribute(
        'data-account-details-to-come-up'
      );
      this.detailsNumberVersements = this.getAttribute(
        'data-account-details-number-of-versements'
      );
      this.detailsAmountScheduledPayment = this.getAttribute(
        'data-account-details-amount-scheduled-payment'
      );
      this.detailsAmountScheduledCurrency = this.getAttribute(
        'data-account-details-amount-scheduled-currency'
      );
      this.detailsAmountScheduledPaymentPeriod = this.getAttribute(
        'data-account-details-amount-scheduled-payment-period'
      );

      this.transfertLinkUrl = this.getAttribute(
        'data-account-link-transfert-url'
      );
      this.linkUrl = this.getAttribute('data-account-link-url');
      this.isShadow = this.getAttribute('shadow');
      this.updatedOn = this.getAttribute('data-updated-on');
      //
      //
      const tpl = document.createElement('template');

      // Si on souhaite afficher le format simplifié
      if (this.model === 'simple') {
        // MODÈLE SIMPLE 1
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__simple${this.renderWithLink()}${this.renderShadow()}">
        <div>
          ${this.label}
        </div>
        <div>
          ${this.renderBuxAmount('xl')}
        </div>
        ${this.renderBuxLink()}
      </div>`;
      } else if (this.model === 'simple-link') {
        // MODÈLE SIMPLE LIEN
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__simple${this.renderWithLink()}${this.renderShadow()}">
        <div>
          ${this.label}
        </div>
        <div></div>
        ${this.renderBuxLink()}
      </div>`;
      } else if (this.model === 'simple-2') {
        // MODÈLE SIMPLE 2
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__simple-2${this.renderWithLink()}${this.renderShadow()}">
          <div class="c-account-tile__simple-2__label">
            ${this.label}
          </div>
          <div class="c-account-tile__simple-2__amount">
            ${this.renderBuxAmount('xl')}
          </div>
          ${this.renderBuxLink()}
        </div>`;
      } else if (this.model === 'heading') {
        // MODÈLE "HEADING" (EN-TÊTE DE DÉTAIL COMPTE)
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__heading${this.renderTypeAccountClass()}${
          this.linkBtnSwitch ? ' c-account-tile--with-switch-btn' : ''
        }${this.renderShadow()}">
        <p class="accessi">Informations du compte sélectionné : </p>
          ${
            this.labelLevel
              ? '<h' +
                this.labelLevel +
                ' class="c-account-tile__heading__label">'
              : '<div>'
          }
          ${this.label}
          ${this.labelLevel ? '</h' + this.labelLevel + '>' : '</div>'}
          ${
            this.updatedOn
              ? '<p class="c-account-tile__heading__updated-on">Solde actualisé le ' +
                this.updatedOn +
                '</p>'
              : ''
          }
          ${
            this.brand
              ? '<div class="c-account-tile__brand">' + this.brand + '</div>'
              : ''
          }
          <div class="c-account-tile__heading__holder">${this.renderHolderAndCoHolder()}</div>
          ${this.renderSwitchCptBtn()}
          <hr role="presentation" class="c-account-tile__line">
          <div class="c-account-tile__heading__footer">
            <div class="c-account-tile__heading__footer__row">
              <div>Solde</div>
              <div><div>${this.renderBuxAmount('xl')}</div></div>
            </div>
              ${this.renderBuxDetails('flexRow')}
          </div>
        </div>
        `;
      } else if (this.model === 'heading-print') {
        // MODÈLE "HEADING-PRINT" (EN-TÊTE DE DÉTAIL COMPTE AVEC BOUTON D'IMPRESSION)
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__heading${this.renderTypeAccountClass()}${
          this.linkBtnSwitch ? ' c-account-tile--with-switch-btn' : ''
        }${this.renderShadow()}">
        <p class="accessi">Informations du compte sélectionné : </p>
          ${
            this.labelLevel
              ? '<h' +
                this.labelLevel +
                ' class="c-account-tile__heading__label">'
              : '<div>'
          }
          ${this.label}
          ${this.labelLevel ? '</h' + this.labelLevel + '>' : '</div>'}
          ${
            this.updatedOn
              ? '<p class="c-account-tile__heading__updated-on__print">Solde actualisé le ' +
                this.updatedOn +
                '</p>'
              : ''
          }
          <div class="c-account-tile__heading__print">
            <button class="btn c-account-tile__heading__print-btn" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="100" height="100"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g transform=""><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#3e3e3e"><path d="M37.84,6.88v44.72h-20.64c-5.6587,0 -10.32,4.6613 -10.32,10.32v61.92c0,5.6587 4.6613,10.32 10.32,10.32h20.64v30.96h96.32v-30.96h20.64c5.6587,0 10.32,-4.6613 10.32,-10.32v-61.92c0,-5.6587 -4.6613,-10.32 -10.32,-10.32h-20.64v-44.72zM44.72,13.76h82.56v37.84h-82.56zM17.2,58.48h23.50219c0.37149,0.0614 0.75054,0.0614 1.12203,0h88.31797c0.37149,0.0614 0.75054,0.0614 1.12203,0h23.53578c1.9437,0 3.44,1.4963 3.44,3.44v61.92c0,1.9437 -1.4963,3.44 -3.44,3.44h-20.64v-30.96h-3.44h-92.88v30.96h-20.64c-1.9437,0 -3.44,-1.4963 -3.44,-3.44v-61.92c0,-1.9437 1.4963,-3.44 3.44,-3.44zM141.04,68.8c-3.79972,0 -6.88,3.08028 -6.88,6.88c0,3.79972 3.08028,6.88 6.88,6.88c3.79972,0 6.88,-3.08028 6.88,-6.88c0,-3.79972 -3.08028,-6.88 -6.88,-6.88zM44.72,103.2h82.56v26.94219c-0.0614,0.37149 -0.0614,0.75054 0,1.12203v26.97578h-82.56v-26.94219c0.0614,-0.37149 0.0614,-0.75054 0,-1.12203zM58.48,113.52c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h55.04c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058zM58.48,127.28c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h41.28c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058zM58.48,141.04c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h55.04c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058z"></path></g><path d="" fill="none"></path></g></g></svg>
          </div>
          ${
            this.brand
              ? '<div class="c-account-tile__brand">' + this.brand + '</div>'
              : ''
          }
          <div class="c-account-tile__heading__holder">${this.renderHolderAndCoHolder()}</div>
          ${this.renderSwitchCptBtn()}
          <hr role="presentation" class="c-account-tile__line">
          <div class="c-account-tile__heading__footer">
            <div class="c-account-tile__heading__footer__row">
              <div>Solde</div>
              <div><div>${this.renderBuxAmount('xl')}</div></div>
            </div>
              ${this.renderBuxDetails('flexRow')}
          </div>
        </div>
        `;
      } else if (this.model === 'complete') {
        // MODÈLE COMPLÊTE (SANS VARIATIONS DE COULEURS)
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__complete${this.renderWithLink()}${this.renderShadow()}">
        <div class="c-account-tile__header">
          <p class="accessi">Informations compte : </p>
          <div class="c-account-tile__complete__label">${this.label}</div>
        </div>
        <div class="c-account-tile__body">
          <div>
            ${
              this.brand
                ? '<div class="c-account-tile__brand">' + this.brand + '</div>'
                : ''
            }
            <div class="c-account-tile__heading__holder">${this.renderHolderAndCoHolder()}</div>
          </div>
          <div>
            <div class="c-account-tile__amount">
            ${this.renderBuxAmount()}
            </div>
            ${this.renderBuxDetails()}
            ${this.renderBuxLink()}
          </div>
        </div>
      </div>`;
      } else if (this.model === 'azb-epargne') {
        // AZB-EPARGNE : Solution temporaire
        // TODO : Harmoniser le model HEADING
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__complete${this.renderWithLink()} c-account-tile--tablet-variant${this.renderTypeAccountClass()}${this.renderShadow()}">
        <div class="c-account-tile__header">
          <p class="accessi">Informations compte : </p>
          <div class="c-account-tile__complete__label">${this.label}</div>
          <div class="c-account-tile__button__holder">${this.renderSwitchCptBtnEpargne()}</div>
          ${this.renderBuxTransfert()}
        </div>
        <div class="c-account-tile__body">
          <div>
            ${
              this.brand
                ? '<div class="c-account-tile__brand">' + this.brand + '</div>'
                : ''
            }
            <div class="c-account-tile__heading__holder">${this.renderHolderAndCoHolder()}</div>
          </div>
          <div>
            <div class="c-account-tile__amount">
            Solde : ${this.renderBuxAmount('xxl')}
            </div>
            ${this.renderBuxDetails()}
            ${this.renderBuxLink()}
          </div>
        </div>
      </div>
        `;
      } else {
        // Sinon, on considère implicitement le modèle 'variant' (idem complet + variante de couleurs)
        // (d'autres modèles pourront être implémentés par la suite si nécessaire)
        // MODÈLE "VARIANT" (AVEC CHANGEMENTS DE COULEURS EN FONCTION DU TYPE DE COMPTE)
        tpl.innerHTML = `
        <div class="c-account-tile c-account-tile__complete${this.renderWithLink()} c-account-tile--tablet-variant${this.renderTypeAccountClass()}${this.renderShadow()}">
        <div class="c-account-tile__header">
          <p class="accessi">Informations compte : </p>
          <div class="c-account-tile__complete__label">${this.label}</div>
          ${this.renderBuxTransfert()}
        </div>
        <div class="c-account-tile__body">
          <div>
            ${
              this.brand
                ? '<div class="c-account-tile__brand">' + this.brand + '</div>'
                : ''
            }
            <div class="c-account-tile__heading__holder">${this.renderHolderAndCoHolder()}</div>
          </div>
          <div>
            <div class="c-account-tile__amount">
            ${this.renderBuxAmount()}
            </div>
            ${this.renderBuxDetails()}
            ${this.renderBuxLink()}
          </div>
        </div>
      </div>`;
      }

      this.appendChild(tpl.content);
      this.isInit = true;
      this.amountEl = this.querySelector('bux2-amount');
    }

    // FONCTION DE RENDU DU BOUTON DE SWITCH COMPTE
    renderSwitchCptBtn() {
      if (this.hasAttribute('data-account-switch-account-id-btn')) {
        let render = `
        <div class="c-switch-btn">
          <bux-btn type="svg" id="modalSwitchComptesBtn" data-icon="switcher" a11y-label="Afficher la liste et sélectionner un autre compte"></bux-btn>
        </div>`;
        return render;
      } else {
        return '';
      }
    }

    renderSwitchCptBtnEpargne() {
      if (this.hasAttribute('data-account-switch-account-id-btn')) {
        let render = `
      <div class="c-switch-btn">
        <bux-btn type="svg" id="modalSwitchComptesBtn" a11y-label="Afficher la liste et sélectionner un autre compte">
        <bux-svg aria-hidden="true" data-icon="switcher" data-class="c-icon"></bux-svg>
      </bux-btn></div>`;
        return render;
      } else {
        return '';
      }
    }

    // FONCTIONS DE RENDU DU LIEN (avec bux2-link)
    renderBuxLink() {
      if (this.hasAttribute('data-account-link-url')) {
        let render = '';
        render += `<bux2-link data-link="${this.linkUrl}" data-label="Afficher le ${this.label}"`;
        if (this.brand || this.holder) {
          render += ` a11y-label="Afficher le détail de ${this.label}`;
          this.brand ? (render += `, ${this.brand}`) : (render += '');
          render += `${this.renderHolderAndCoHolder()}"`;
        }
        render += ' block-arrow></bux2-link>';
        return render;
      } else {
        return '';
      }
    }
    // FONCTION DU RENDU DU BOUTON DE VIREMENT (masqué pour le vocal)
    renderBuxTransfert() {
      if (this.hasAttribute('data-account-link-transfert-url')) {
        return `<div aria-hidden="true" class="c-transfert-link"><bux2-link data-link="${this.transfertLinkUrl}" data-label="Effectuer un virement depuis ce compte" block>Virement</bux2-link></div>`;
      } else {
        return '';
      }
    }
    // FONCTION D'INJECTION DE LA CLASSE with link
    renderWithLink() {
      return this.hasAttribute('data-account-link-url')
        ? ' c-account-tile--with-link'
        : '';
    }
    // FONCTION DU RENDU DE LA CLASSE 'SHADOW' POUR L'OMBRE PORTÉE
    renderShadow() {
      if (
        this.hasAttribute('shadow') &&
        this.getAttribute('shadow') !== 'false'
      ) {
        return ' c-account-tile--shadow';
      } else {
        return '';
      }
    }
    // FONCTION DU RENDU DU BÉNÉFICIAIRE + CO-BÉNÉFICIAIRE (si présent)
    renderHolderAndCoHolder() {
      let render = '';
      if (
        this.hasAttribute('data-account-holder') &&
        this.hasAttribute('data-account-coholder')
      ) {
        render += ' ' + this.holder + ' et ' + this.coholder;
      } else if (this.hasAttribute('data-account-holder')) {
        render += ' ' + this.holder;
      } else {
        render += '';
      }
      return render;
    }
    // FONCTION DU RENDU DU MONTANT
    renderBuxAmount(size = 'md') {
      if (this.hasAttribute('data-account-amount')) {
        if (this.amount === 'nodisplay') {
          return '';
        } else {
          return `
          <bux2-amount
            value="${this.amount}"
            size="${size}"
            ${this.currency ? `currency="${this.currency}"` : ''}>
          </bux2-amount>`;
        }
      } else {
        return `<em>Solde momentanément indisponible</em>`;
      }
    }

    get amount() {
      return this.getAttribute('data-account-amount');
    }

    set amount(value) {
      this.setAttribute('data-account-amount', value);
    }

    updateAmount() {
      this.amountEl.value = this.amount;
    }

    get currency() {
      return this.getAttribute('data-account-currency');
    }

    set currency(value) {
      this.setAttribute('data-account-currency', value);
    }

    updateCurrency() {
      this.amountEl.currency = this.currency;
    }

    renderBuxDetailAmount() {
      let render = `<bux2-amount size="sm" value="${this.detailsAmountScheduledPayment}"`;
      if (this.hasAttribute('data-account-details-amount-scheduled-currency')) {
        //data-account-details-amount-scheduled-currency : PRÉSENT
        render += ` currency="${this.detailsAmountScheduledCurrency}"`;
      }
      if (
        this.hasAttribute(
          'data-account-details-amount-scheduled-payment-period'
        )
      ) {
        //data-account-details-amount-scheduled-payment-period : PRÉSENT
        render += ` suffix=" / ${this.detailsAmountScheduledPaymentPeriod}"`;
      } else {
        //data-account-details-amount-scheduled-payment-period : NON PRÉSENT
        render += ` suffix=" / mois"`;
      }
      render += `></bux2-amount>`;
      return render;
    }
    // FONCTION DE RENDU DE LA MENTION COMPLÉMENTAIRE (Versements programmés, ...)
    renderBuxDetails(flexRow) {
      // On affichera selon la priorité définie ci-dessous
      let render = '';
      //VERSEMENT PROGRAMMÉ
      if (this.hasAttribute('data-account-details-amount-scheduled-payment')) {
        render += `<span class="c-account-tile__note"><span>Versement programmé : </span>${this.renderBuxDetailAmount()}</span>`;
        // NOMBRE DE VERSEMENTS PROGRAMMÉS
      } else if (
        this.hasAttribute('data-account-details-number-of-versements')
      ) {
        render += `<span class="c-account-tile__note"><span>${this.detailsNumberVersements} versements programmés</span></span>`;
        // PRÉLÈVEMENT À VENIR
      } else if (this.hasAttribute('data-account-details-to-come-up')) {
        if (flexRow) {
          render += `<div class="c-account-tile__note c-account-tile__heading__footer__row"><span>À venir : </span><bux2-amount value="${this.detailsToComeUp}"></bux2-amount></div>`;
        } else {
          render += `<span class="c-account-tile__note"><span>À venir : </span><bux2-amount value="${this.detailsToComeUp}"></bux2-amount></span>`;
        }
        // MENTION LIBRE
      } else if (this.hasAttribute('data-account-details')) {
        // Sinon, mention libre
        render += `<span class="c-account-tile__note"><span>${this.details}</span></span>`;
      }
      return render;
    }
    // FONCTION DE RENDU DE TYPE DE COMPTE (ÉPARGNE, RENOUVELABLE, ...)
    renderTypeAccountClass() {
      let render = '';
      switch (this.type) {
        case 'account':
          render = ' c-account-tile--account';
          break;
        case 'saving':
          render = ' c-account-tile--saving';
          break;
        case 'saving-mt':
          render = ' c-account-tile--saving-mt';
          break;
        case 'saving-lt':
          render = ' c-account-tile--saving-lt';
          break;
        case 'revolving':
          render = ' c-account-tile--revolving';
          break;
        default:
          render = '';
          break;
      }
      // On retourne la classe obtenue
      return render;
    }
    // FONCTION D'AFFICHAGE DU BOUTON AVEC POP-IN AVEC LISTE DES COMPTES
    renderPopinSwitchCompte() {
      let render = '';
      // Génération de la modale
      render += '<bux-modal id="modalSwitchComptes"> </bux-modal>';
      // Génération du bouton
      render +=
        '<button id="modalSwitchComptesBtn" title="Sélectionner un autre compte" aria-label="Afficher un autre compte dans la liste de tous vos comptes" >Switch compte</button>';
      // Ajout du script
      const modal = document.querySelector('#modalSwitchComptes');
      const modalSwitchComptesBtn = document.querySelector(
        '#modalSwitchComptesBtn'
      );

      customElements.whenDefined('bux-modal').then(() => {
        modalSwitchComptesBtn.addEventListener('click', () =>
          modal.init({
            label: 'Mon Titre',
            content: '<p>Je suis un contenu</p><p>deuxièmeligne</p>',
            labelFailure: 'annuler',
            labelSuccess: 'ok',
            onFailure: () => modal.close(),
            onSuccess: () => modal.close(),
            closable: true,
            autoOpen: true,
            focusBackElement: document.getElementById('focusEl')
          })
        );
      });

      return render;
    }

    //JE VÉRIFIE SI LES ATTRIBUTS CHANGENT EN TEMPS RÉEL
    attributeChangedCallback(name) {
      switch (name) {
        case 'data-account-amount':
          if (this.amountEl) {
            this.updateAmount();
          }
          break;
        case 'data-account-currency':
          if (this.amountEl) {
            this.updateCurrency();
          }
          break;
      }
    }
  }
);
