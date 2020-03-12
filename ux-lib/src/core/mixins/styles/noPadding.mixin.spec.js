export const noPadding = customEl => {
  it('No padding Mixin working ?', () => {
    // Ajout d'un element a trigger dans le document
    customEl.noPadding = true;
    expect(customEl.container.classList).toContain('c-no-padding');

    // Disable off don't have class
    customEl.noPadding = false;
    expect(customEl.container.classList).not.toContain('c-no-padding');
  });
};
