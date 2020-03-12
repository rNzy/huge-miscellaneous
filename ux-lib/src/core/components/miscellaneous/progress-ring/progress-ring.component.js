import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');

tpl.innerHTML = `
<div class="c-progress-ring">
	<svg class="c-progress-ring__svg" viewBox="0 0 100 100">
		<circle 
			class="c-progress-ring__circle"
			fill="transparent"
		/>
	</svg>
	<svg class="c-progress-ring__svg c-progress-ring__svg--shadow" viewBox="0 0 100 100">
		<circle 
			class="c-progress-ring__shadow"
			stroke-dasharray="301.59289474462014 301.59289474462014"
			style="stroke-dashoffset: 0;"
			fill="transparent"
		/>
	</svg>
</div>
<div class="c-progress-ring--content">
	<slot name="content"></slot>
</div>
`;

/**
 * Affiche un anneau de chargement dynamique.
 *
 * @element ux-progress-ring
 *
 * @prop {Number} value - incrémente la progression dans le temps (0->100)
 * @prop {String} a11yLabel - permet d'injecter l'attribut aria-label pour la vocalisation
 *
 * @slot content
 *
 * @exports
 * @class ProcessRingBase
 * @extends {BaseShadowComponent}
 */
export default class ProcessRingBase extends Base {
  static get properties() {
    return {
      value: { type: 'number' },
      a11yLabel: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'value':
        this._setProgress(this.value);
        break;
      case 'a11y-label':
        this._setAriaLabel();
        break;
    }
  }

  _setProgress(percentage) {
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    const circle = this.$.querySelector('circle');
    circle.style.strokeDashoffset = offset;
    circle.setAttribute(
      'stroke-dasharray',
      circumference + ' ' + circumference
    );
    circle.setAttribute('stroke-width', stroke);
    circle.setAttribute('r', normalizedRadius);
    circle.setAttribute('cx', radius);
    circle.setAttribute('cy', radius);
  }

  _setAriaLabel() {
    const progressRing = this.$.querySelector('.c-progress-ring');
    this.a11yLabel
      ? progressRing.setAttribute('aria-label', this.a11yLabel)
      : progressRing.removeAttribute('aria-label');
  }
}
