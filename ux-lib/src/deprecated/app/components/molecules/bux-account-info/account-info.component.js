import './account-info.styles.scss';

customElements.define(
  'bux-account-info',

  class AccountInfo extends HTMLElement {
    constructor() {
      super();
      this.accountLabel = '';
      this.accountCoholder = '';
    }

    connectedCallback() {
      if (this.isInit) return;
      this.render();
      this.setAccountInfo();
      this.isInit = true;
    }

    static get observedAttributes() {
      return ['account-label', 'account-holder', 'account-coholder'];
    }

    attributeChangedCallback() {
      this.setAccountInfo();
    }

    getAccountInfo() {
      this.accountLabelWrapper = this.querySelector('.c-account-info__label');
      this.accountHolderWrapper = this.querySelector('.c-account-info__holder');
      this.accountCoHolderWrapper = this.querySelector(
        '.c-account-info__coholder'
      );
      this.accountLabel = this.getAttribute('account-label');
      this.accountHolder = this.getAttribute('account-holder');
      this.accountCoHolder = this.getAttribute('account-coholder');
    }

    setAccountInfo() {
      this.getAccountInfo();
      if (this.accountLabelWrapper) {
        this.accountLabelWrapper.textContent = this.accountLabel;
      }
      if (this.accountHolderWrapper) {
        this.accountHolderWrapper.textContent = this.accountHolder;
      }
      if (this.accountCoHolderWrapper) {
        this.accountCoHolderWrapper.textContent = this.accountCoHolder;
      }
    }

    render() {
      this.innerHTML = this.template();
    }

    template() {
      return `
      <section class="c-account-info u-text-center o-card-grid__item">
        <div class="c-account-info__label u-text-body"></div>
        <small class="u-text-smallprint">
          <span class="c-account-info__holder"></span>${
            this.accountCoHolder
              ? ' & <span class="c-account-info__coholder"></span>'
              : ''
          }
        </small>
      </section>
    `;
    }
  }
);
