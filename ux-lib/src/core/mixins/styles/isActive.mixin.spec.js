export const isActive = customEl => {
  it('Is Active Mixin working ?', () => {
    // Ajout d'un element a trigger dans le document
    customEl.active = true;
    expect(customEl.container.classList).toContain('is-active');

    // Disable off don't have class
    customEl.active = false;
    expect(customEl.container.classList).not.toContain('is-active');
  });
};
