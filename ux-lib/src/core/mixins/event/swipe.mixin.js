/**
 * Mixin de swipe
 * Pour l'utiliser il faut faire un :
 *
 * this.addSwipeEvt(El, options); // avec El est un element HTML du dom sur
 * lequel on veut écouter.
 * options est un objet qui peut contenir :
 * {
 *  mindx: valeur minimale de déplacement horizontal en px afin de déclencher les evenements expliquer ci-dessous
 *  mindy: valeur minimale de déplacement vertical en px afin de déclencher les evenements expliquer ci-dessous
 * }
 *
 * Quand il y aura du touch ou du drag and drop sur cet element celui-ci va emettre plusieurs
 * event :
 *  - swipe-left => l'utilisateur est allé à gauche mais est toujours entrain de se déplacer
 *  - swipe-right => l'utilisateur est allé à droite mais est toujours entrain de se déplacer
 *  - swipe-up => ""
 *  - swipe-down => ""
 *
 *  - swipe-left-end => l'utilisateur est allé à gauche et c'est fini
 *  - swipe-right-end => l'utilisateur est allé à droite et c'est fini
 *  - swipe-up-end => ""
 *  - swipe-down-end => ""
 *
 * On peut utiliser la méthode removeSwipeEvt pour supprimer tout les evenements
 * @param {} base
 */

export default function SwipeMixin(base) {
  /**
   *
   *
   * @class SwipeMixin
   * @extends {base}
   *
   * @fires swipe-left - l'utilisateur est allé à gauche mais est toujours entrain de se déplacer
   * @fires swipe-right - l'utilisateur est allé à droite mais est toujours entrain de se déplacer
   * @fires swipe-up - l'utilisateur est allé en haut mais est toujours entrain de se déplacer
   * @fires swipe-down - l'utilisateur est allé en bas mais est toujours entrain de se déplacer
   *
   * @fires swipe-left-end - l'utilisateur est allé à gauche et c'est fini
   * @fires swipe-right-end - l'utilisateur est allé à droite et c'est fini
   * @fires swipe-up-end - l'utilisateur est allé en haut et c'est fini
   * @fires swipe-down-end - l'utilisateur est allé en bas et c'est fini
   */
  class SwipeMixin extends base {
    constructor() {
      super();

      this.x0 = null; // start x position
      this.y0 = null; // start y position
      this.onDrag = false; // is it dragging ?

      this.element = null; // Element to put event

      this.dragStart = this.dragStart.bind(this);
      this.dragStop = this.dragStop.bind(this);
      this.drag = this.drag.bind(this);
      this.emitEvtHelper = this.emitEvtHelper.bind(this);
    }

    // Remove Event
    disconnectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      this.removeSwipeEvt();
    }

    ///// HELPER
    // Return HTLMEl
    selector(el) {
      if (typeof el === 'string') {
        return document.querySelector(el);
      } else {
        return el;
      }
    }

    // Handle mouse event and touch event
    unitEvent(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }

    calculateDiff(e) {
      return {
        dx: this.x0 - this.unitEvent(e).clientX,
        dy: this.y0 - this.unitEvent(e).clientY
      };
    }

    emitEvtHelper(evtName, delta) {
      this.element.dispatchEvent(
        new CustomEvent(evtName, {
          bubbles: true,
          cancelable: true,
          detail: {
            x0: this.x0,
            y0: this.y0,
            dx: delta.dx,
            dy: delta.dy
          }
        })
      );
    }

    // Add listener
    addSwipeEvt(el, { mindx, mindy } = { mindx: 10, mindy: 10 }) {
      // Auto bind to this if you don't give element
      if (!el) el = this;

      // Check if it was called to times
      if (this.element) {
        this.removeSwipeEvt();
        this.x0 = null; // start x position
        this.y0 = null; // start y position
        this.onDrag = false; // is it dragging ?
        this.element = null; // Element to put event
      }

      // Minimun de delta pour emettre l'évent
      this.mindx = mindx;
      this.mindy = mindy;

      this.element = this.selector(el);
      this.element.addEventListener('mousedown', this.dragStart, false);
      this.element.addEventListener('touchstart', this.dragStart, false);
    }

    // Remove listener
    removeSwipeEvt() {
      this.element.removeEventListener('mousedown', this.dragStart, false);
      this.element.removeEventListener('touchstart', this.dragStart, false);

      this.element.removeEventListener('mousemove', this.drag, false);
      this.element.removeEventListener('touchmove', this.drag, false);

      this.element.removeEventListener('mouseup', this.dragStop, false);
      this.element.removeEventListener('touchend', this.dragStop, false);
    }

    // Start to drag
    dragStart(e) {
      this.element.addEventListener('mousemove', this.drag, false);
      this.element.addEventListener('touchmove', this.drag, false);

      this.element.addEventListener('mouseup', this.dragStop, false);
      this.element.addEventListener('touchend', this.dragStop, false);

      this.x0 = this.unitEvent(e).clientX;
      this.y0 = this.unitEvent(e).clientY;
      this.onDrag = true;
    }

    // On drag
    drag(e) {
      if (this.onDrag) {
        const delta = this.calculateDiff(e);

        // On a suffisament bouger
        if (Math.abs(delta.dx) > this.mindx) {
          if (delta.dx < 0) {
            this.emitEvtHelper('swipe-left', delta);
          } else {
            this.emitEvtHelper('swipe-right', delta);
          }
        }
      }
    }

    // Stop dragging
    dragStop(e) {
      if (this.onDrag) {
        const delta = this.calculateDiff(e);

        // On a suffisament bouger
        if (Math.abs(delta.dx) > this.mindx) {
          if (delta.dx < 0) {
            this.emitEvtHelper('swipe-left-end', delta);
          } else {
            this.emitEvtHelper('swipe-right-end', delta);
          }
        }

        // On a suffisament bouger
        if (Math.abs(delta.dy) > this.mindy) {
          if (delta.dy < 0) {
            this.emitEvtHelper('swipe-up-end', delta);
          } else {
            this.emitEvtHelper('swipe-down-end', delta);
          }
        }
      }

      this.element.removeEventListener('mousemove', this.drag, false);
      this.element.removeEventListener('touchmove', this.drag, false);

      this.element.removeEventListener('mouseup', this.dragStop, false);
      this.element.removeEventListener('touchend', this.dragStop, false);

      this.x0 = null;
      this.y0 = null;
      this.onDrag = false;
    }
  }
  return SwipeMixin;
}
