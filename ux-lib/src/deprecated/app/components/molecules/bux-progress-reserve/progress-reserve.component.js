import BuxClass from '../../../../bux.class';
import './progress-reserve.style.scss';

// import '../../atoms/bux-progress-ring/progress-ring.component';
// import '../../atoms/bux-amount/amount.component';

const tplReserve = document.createElement('template');
tplReserve.innerHTML = `
  <section class="c-reserve o-card-grid__item">
    <bux-progress-ring>
      <bux-text></bux-text>
    </bux-progress-ring>
    <div class="c-reserve__label"></div>
    <bux-amount class="js-reserve-amount" align-right size="xl"></bux-amount>
  </section>
`;

customElements.define(
  'bux-progress-reserve',

  class ProgressRingReserve extends BuxClass {
    connectedCallback() {
      if (this.isInit) return;
      this.appendChild(tplReserve.content.cloneNode(true));
      this.setReserveDisponible();
      this.isInit = true;
    }

    setReserveDisponible() {
      this.reserveLabel = this.getAttribute('data-label');
      this.value = this.getAttribute('data-value');
      this.reserveAmount = this.getAttribute('data-amount');
      this.progressRingAriaLabel = this.getAttribute('a11y-label');

      this.reserveAmountWrapper = this.querySelector('.js-reserve-amount');
      this.progressRing = this.querySelector('bux-progress-ring');
      this.progressText = this.querySelector('bux-text');
      this.reserveLabelWrapper = this.querySelector('.c-reserve__label');

      if (this.progressRing) {
        this.progressRing.setAttribute(
          'a11y-label',
          this.progressRingAriaLabel
        );
        this.progressRing.setAttribute('data-value', this.value);
      }
      if (this.progressText) {
        this.progressText.textContent = this.value + '%';
      }
      if (this.reserveLabelWrapper) {
        this.reserveLabelWrapper.textContent = this.reserveLabel;
      }
      if (this.reserveAmountWrapper) {
        this.reserveAmountWrapper.setAttribute(
          'data-value',
          this.reserveAmount
        );
      }
    }
  }
);
