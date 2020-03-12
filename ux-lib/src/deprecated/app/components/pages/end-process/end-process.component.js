import BuxClass from '../../../../bux.class';

import './end-process.styles.scss';

import construction from './construction.png';

import brokenScreen from './broken-screen.png';

customElements.define(
  'bux-end-process',

  class ProcessEnd extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    static get observedAttributes() {
      return ['data-html'];
    }

    attributeChangedCallback() {
      this.setHtml();
    }

    setHtml() {
      const html = this.getAttribute('data-html') || null;
      const htmlEl = this.querySelector('.c-end-process__html');

      if (htmlEl && html) {
        htmlEl.innerHTML = html;
        htmlEl.style.display = '';
      }
    }

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      // Init

      this.type = this.getAttribute('type') || null;

      // Create Html
      const tpl = document.createElement('template');
      tpl.innerHTML = `
        <section class="c-end-process${
          this.type ? ` c-end-process--${this.type}` : ''
        }"
         ${this.type === 'smi' ? 'role="alert" aria-live="assertive"' : ''}
        >
          ${this.setIcon()}
          ${this.setLabel()}
          ${this.setSubLabel()}
          <div class="c-end-process__html" style="display:none;"></div>
          ${this.setBtn()}
        </section>
      `;

      // Add html to dom
      this.appendChild(tpl.content);

      // Set type
      this.setEvent();

      this.setHtml();

      // Focus
      if (this.getAttribute('autofocus') !== 'false') {
        const labelEl = this.querySelector('.c-end-process__label');
        const subLabelEl = this.querySelector('.c-end-process__sublabel');

        if (labelEl) {
          labelEl.focus();
        } else if (subLabelEl) {
          subLabelEl.setAttribute('tabindex', '0');
          subLabelEl.focus();
        }
      }
    }

    setIcon() {
      const icon = this.getAttribute('data-icon') || null;
      const img = this.getAttribute('data-img') || null;

      if (icon)
        return `<bux-svg data-icon=${icon} data-class="c-end-process__icon"></bux-svg>`;
      if (img)
        return `<img aria-hidden="true" alt="" src=${img} class="c-end-process__img" />`;

      if (this.type === 'success') {
        return '<bux-svg data-icon="check" data-class="c-end-process__icon"></bux-svg>';
      } else if (this.type === 'error') {
        return '<bux-svg data-icon="cross-error" data-class="c-end-process__icon"></bux-svg>';
      } else if (this.type === 'underConstruction') {
        return `<img aria-hidden="true" alt="" height="205" widht="175" src="${this.uxLibUrl}/${construction}" class="c-end-process__img" />`;
      } else if (this.type === 'debranchement') {
        return '<bux-svg data-icon="data-exchange" data-class="c-icon c-icon--huge"></bux-svg>';
      } else if (this.type === 'pending') {
        return '<div class="rotating-icon__wrapper"><bux-svg data-icon="loading-arrows" data-class="c-end-process__icon"></bux-svg></div>';
      } else if (this.type === 'smi') {
        return `<img aria-hidden="true" alt="" height="205" widht="175" src="${this.uxLibUrl}/${brokenScreen}" class="c-end-process__img" />`;
      }

      return '';
    }

    setLabel() {
      const label = this.getAttribute('data-label') || null;
      if (label)
        return `<p class="c-end-process__label" tabindex="0">${label}</p>`;

      if (this.type === 'smi') {
        return '<p class="c-end-process__label" tabindex="0">Cette fonctionnalité est momentanément indisponible</p>';
      } else if (this.type === 'debranchement') {
        return '<p class="c-end-process__label" tabindex="0">Redirection en cours</p>';
      }

      return '';
    }

    setSubLabel() {
      const sublabel = this.getAttribute('data-sublabel') || null;
      if (sublabel)
        return `<p class="c-end-process__sublabel" tabindex="0">${sublabel}</p>`;

      if (this.type === 'smi') {
        return (
          '<p tabindex="0">Nous mettons en oeuvre les moyens nécessaires pour rétablir ce service dans les meilleurs délais. Nous vous remercions par avance de votre compréhension.</p>' +
          '<p class="c-end-process__sublabel" tabindex="0">Vous pouvez accéder aux autres fonctionnalités en sélectionnant le menu de votre choix.</p>'
        );
      } else if (this.type === 'underConstruction') {
        return '<p class="c-end-process__sublabel" tabindex="0">Cette fonctionnalité n\'est pas encore disponible sur cette nouvelle version du site.<strong>Vous allez être dirigés vers l\'ancien site</strong> pour réaliser votre opération.</p>';
      } else if (this.type === 'debranchement') {
        return '<p class="c-end-process__sublabel" tabindex="0">Cette fonctionnalité n\'est pas encore disponible sur cette nouvelle version du site.<br aria-hidden="true"><strong>Vous allez être dirigés vers l\'ancien site</strong> pour réaliser votre opération.</p>';
      }
      return '';
    }

    setBtn() {
      const btnUrl = this.getAttribute('data-url') || null;
      const btnType = this.getAttribute('data-type-button') || 'link';
      const btnLabel = this.getAttribute('data-label-button') || null;

      if (btnUrl && btnLabel)
        return `<bux-btn data-role="${btnType}" data-link="${btnUrl}">${btnLabel}</bux-btn>`;
      if (btnLabel)
        return `<bux-btn data-role="${btnType}">${btnLabel}</bux-btn>`;

      if (this.type === 'smi') {
        return `<bux-btn data-role="link" data-link="${btnUrl}">Revenir à l'accueil</bux-btn>`;
      } else if (this.type === 'underConstruction' && btnUrl) {
        return `<bux-btn data-role="link" data-link="${btnUrl}">Accéder à la fonctionnalité</bux-btn>`;
      } else if (this.type === 'debranchement' && btnUrl) {
        return `<bux-btn data-role="link" data-link="${btnUrl}">Accéder à la fonctionnalité</bux-btn>`;
      }

      return '';
    }

    setEvent() {
      const buxBtn = this.querySelector('bux-btn');

      // Event
      if (buxBtn) {
        buxBtn.addEventListener('click', () =>
          this.dispatchEvent(new CustomEvent('end'))
        );
      }
    }
  }
);
