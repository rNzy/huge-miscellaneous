import BuxClass from '../../../../bux.class';

import './skip-nav.styles.scss';

customElements.define(
  'bux-skip-nav',
  class SkipNav extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = `
        <nav id="skipnav" aria-labelledby="main-title">
          <ul class="c-skipnav-ul">
              <li><a class="c-skipnav-a" href="#left-nav">Accéder au menu principal</a></li>
              <li><a class="c-skipnav-a" href="#main">Accéder au contenu</a></li>
              <li><a class="c-skipnav-a" href="#c-header-desktop">Accéder au menu personnel</a></li>
              <li><a class="c-skipnav-a" href="/public/accessibilite">Accéder à la page accessibilité</a></li>
          </ul>
        </nav>`;

      const links = tpl.content.querySelectorAll('.c-skipnav-a');
      const nav = tpl.content.querySelector('#skipnav');

      links.forEach(link => {
        link.addEventListener('focus', () => {
          nav.classList.add('c-skipnav-open');
        });

        link.addEventListener('blur', () => {
          nav.classList.remove('c-skipnav-open');
        });

        link.addEventListener('click', e => {
          e.preventDefault();
          const focusEl = document.getElementById(link.href.split('#').pop());
          focusEl.setAttribute('tabindex', '-1');
          if (focusEl) focusEl.focus();
        });
      });

      // Insert your element in the dom
      this.appendChild(tpl.content);

      this.isInit = true;
    }
  }
);
