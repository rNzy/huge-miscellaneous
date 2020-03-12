export default function listMixin(base) {
  class ListMixin extends base {
    constructor() {
      super();
      this.container
        ? this.container.setAttribute('role', 'list')
        : this.setAttribute('role', 'list');
      Array.from(this.children).forEach(item => {
        item.setAttribute('role', 'listitem');
      });
    }
  }
  return ListMixin;
}
