import {
  haveShadow,
  haveSlot,
  haveContainer
} from '../../../../core/base/baseShadowComponent.mixin.spec';

import { delegateFocus } from '../../../../core/mixins/aria/delegateFocus.mixin.spec';
import { hiddenStyle } from '../../../../core/mixins/aria/hidden-style.mixin.spec';

import { triggerEl } from '../../../../core/mixins/event/triggerEl.mixin.spec';

import { btnOutlined } from '../../../../core/mixins/styles/btnOutlined.mixin.spec';
import { btnNoStyle } from '../../../../core/mixins/styles/btnNoStyle.mixin.spec';
import { elementAlignmentFlex } from '../../../../core/mixins/layout/elementAlignment.mixin.spec';

export default [
  describe('Button Component', () => {
    // Set up our document body
    // delare global var
    document.body.innerHTML = `<input id="input"></input><ux-btn>primary</ux-btn>`;
    const uxBtn = document.querySelector('ux-btn');
    const btn = uxBtn.$.querySelector('button');

    haveShadow(uxBtn);
    haveSlot(uxBtn);
    haveContainer(uxBtn);

    delegateFocus(uxBtn);
    triggerEl(uxBtn);
    btnOutlined(uxBtn);
    btnNoStyle(uxBtn);
    elementAlignmentFlex(uxBtn);
    hiddenStyle(uxBtn);

    it('Button exists ?', () => {
      expect(btn).toBeTruthy();
    });

    it('Model primary', () => {
      uxBtn.model = 'primary';
      expect(btn.classList).toContain('c-btn--primary');
    });

    it('Model secondary', () => {
      uxBtn.model = 'secondary';
      expect(btn.classList).toContain('c-btn--secondary');
    });

    it('Have model secondary class but not primary', () => {
      uxBtn.model = 'secondary';
      expect(btn.classList).not.toContain('c-btn--primary');
    });

    it('Disabled', () => {
      // Disable on have class
      uxBtn.disabled = true;
      expect(btn.classList).toContain('c-btn--disabled');

      // Disable off don't have class
      uxBtn.disabled = false;
      expect(btn.classList).not.toContain('c-btn--disabled');
    });

    it('no-style', () => {
      // Disable on have class
      uxBtn.noStyle = true;
      expect(btn.classList).not.toContain('c-btn');
      expect(btn.classList).toContain('m-btn-no-style');

      // Disable off don't have class
      uxBtn.noStyle = false;
      expect(btn.classList).toContain('c-btn');
      expect(btn.classList).not.toContain('m-btn-no-style');
    });

    it('a11yLabel', () => {
      // Enable
      uxBtn.a11yLabel = 'Salut a11y';
      expect(btn.getAttribute('aria-label')).toEqual('Salut a11y');

      // Disable
      uxBtn.a11yLabel = '';
      expect(btn.hasAttribute('aria-label')).toBeFalsy();
    });

    it('libTitle', () => {
      // Enable
      uxBtn.libTitle = 'Je suis un titre';
      expect(btn.getAttribute('title')).toEqual('Je suis un titre');
      expect(btn.innerHTML).toContain('class="a11y-hidden"');

      // Disable
      uxBtn.libTitle = '';
      expect(btn.hasAttribute('title')).toBeFalsy();
      expect(btn.innerHTML).not.toContain('class="a11y-hidden"');
    });
  })
];
