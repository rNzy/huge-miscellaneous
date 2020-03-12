import BuxClass from '../../../../bux.class';
import './btn-group.styles.scss';

// import '../../atoms/bux-btn/btn.component';

customElements.define(
  'bux-btn-group',
  class BtnGroup extends BuxClass {
    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit) return;

      // Create ul wrapper
      this.ul = document.createElement('ul');
      this.ul.classList.add('bux-btn-group');

      if (this.hasAttribute('nomarginbottom') &&
      this.getAttribute('nomarginbottom') !== 'false') {
        this.ul.classList.add('bux-btn-group-nomarginbottom');
      }

      if (this.hasAttribute('vertical') &&
      this.getAttribute('vertical') !== 'false') {
        this.ul.classList.add('bux-btn-group-vertical');
      } else {
        this.ul.classList.add('bux-btn-group-horizontal');
      }

      // Get slot (button declare inside bux-btn-group)
      this.slots = this.querySelectorAll('bux-btn');

      // For each slot create list and move button
      // it inside li
      this.slots.forEach(slot => {
        this.makeOneEl(slot);
      });

      // Render it
      this.appendChild(this.ul);

      this.isInit = true;
    }

    makeOneEl(slot) {
      const li = document.createElement('li');
      li.classList.add('bux-btn-group-item');

      li.appendChild(slot);

      // Create li element and add it to ul
      this.ul.appendChild(li);
    }
  }
);
