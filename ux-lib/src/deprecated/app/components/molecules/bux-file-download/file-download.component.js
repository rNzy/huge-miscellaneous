import BuxClass from '../../../../bux.class';
import './file-download.styles.scss';

customElements.define(
  'bux-file-download',

  class FileDownload extends BuxClass {
    connectedCallback() {
      this.labelTitle = this.getAttribute('data-label') || '';
      this.labelSubtitle = this.getAttribute('data-sublabel') || '';
      this.filePath = this.getAttribute('data-path') || '';
      this.fileName = this.getAttribute('data-filename') || '';
      this.fileType = this.getAttribute('data-filetype') || '';
      this.fileSize = this.getAttribute('data-filesize') || '';
      this.fileLang = this.getAttribute('data-filelang') || '';
      this.a11yLabel = this.getAttribute('a11y-label') || '';
      this.horizontal =
        this.hasAttribute('horizontal') &&
        this.getAttribute('horizontal') !== 'false';
      this.nomarginbottom =
        this.hasAttribute('nomarginbottom') &&
        this.getAttribute('nomarginbottom') !== 'false';

      // render
      this.innerHTML = this.template();

      this.querySelector('.c-file-operation__action-button').addEventListener(
        'click',
        e => {
          this.dispatchEvent(
            new CustomEvent('dlclick', {
              detail: {
                target: '.c-file-operation__action-button',
                originalEvent: e
              }
            })
          );
        }
      );

      this.items = this.querySelectorAll('bux-text');
      this.items.forEach(element => {
        element.setAttribute('aria-hidden', true);
      });

      this.parentEl = this.querySelector('.c-file-operation');
      this.labelEl = this.querySelector('.c-file-operation__title');
      this.subLabelEl = this.querySelector('.c-file-operation__sublabel');
      this.iconEl = this.querySelector('.c-file-operation__icon');
      this.buttonEl = this.querySelector('.c-file-operation__action-button');
      this.setStyle();
    }

    setStyle() {
      if (this.horizontal === false) {
        this.parentEl.classList.add('c-file-operation--tile');
        this.labelEl.classList.add('c-file-operation__title--tile');
        this.buttonEl.classList.add('c-file-operation__action-button--tile');
      } else {
        this.parentEl.classList.add('c-file-operation--inline');
        this.labelEl.classList.add('c-file-operation__title--inline');

        this.buttonEl.classList.add('c-file-operation__action-button--inline');
      }
      if (this.nomarginbottom) {
        this.parentEl.classList.add('c-file-operation--nomarginbottom');
      }
    }

    template() {
      return `
      <span class="c-file-operation">
        ${
          this.labelTitle
            ? `<div class="c-file-operation__title"> ${this.labelTitle} </div>`
            : ''
        }
        ${
          this.labelSubtitle
            ? `<div class="c-file-operation__sublabel"> ${
                this.labelSubtitle
              }  </div>`
            : ''
        }
        ${
          this.horizontal === false
            ? '<bux-svg aria-hidden="true"  data-icon="file"  data-class="c-file-operation__icon c-icon"></bux-svg>'
            : ''
        }
        <span>
        ${
          this.fileSize ? `<bux-text size="sm">${this.fileSize}</bux-text>` : ''
        }
        ${
          this.fileLang ? `<bux-text size="sm">${this.fileLang}</bux-text>` : ''
        }
        ${
          this.fileType ? `<bux-text size="sm">${this.fileType}</bux-text>` : ''
        }
        </span>
        <a class="c-file-operation__action-button" href="${this.filePath}" ${
        this.fileName ? `download="${this.fileName}"` : ''
      } title="${this.a11yLabel}">
          <bux-svg
          data-icon="download"
          data-class="c-file-operation__action-icon c-icon">
          </bux-svg>
        </a>
      </div>
      `;
    }
  }
);
